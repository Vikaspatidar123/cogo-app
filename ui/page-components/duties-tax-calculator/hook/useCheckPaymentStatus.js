import { Toast } from '@cogoport/components';
import { useState, useEffect, useCallback, useRef } from 'react';

import { useRouter } from '@/packages/next';
import { useRequestBf } from '@/packages/request';

const useCheckPaymentStatus = ({
	setShowPendingModal,
	postTradeEngine,
	isUserSubscribed = false,
	isQuotaLeft = false,
	getDraftFn,
	setValidateModal,
}) => {
	const [stop, setStop] = useState(false);
	const { query } = useRouter();

	const { billId = '' } = query || {};
	const count = useRef(0);

	const [{ loading }, trigger] = useRequestBf({
		url     : 'saas/bill/status',
		authKey : 'get_saas_bill_status',
		method  : 'get',
	}, { manual: true });

	const paymentSuccessHandler = useCallback(async (data) => {
		setShowPendingModal(false);

		if (!isQuotaLeft && !isUserSubscribed) {
			await getDraftFn(data?.billRefId);
			setValidateModal(true);
		} else {
			postTradeEngine(data?.billRefId, 'PAYMENT', billId);
		}
	}, [billId, getDraftFn, isQuotaLeft, isUserSubscribed, postTradeEngine, setShowPendingModal, setValidateModal]);

	const checkPaymentStatus = useCallback(async () => {
		try {
			const resp = await trigger({
				params: {
					billId,
				},
			});
			setShowPendingModal(true);

			if (resp?.data?.status === 'PAID') {
				paymentSuccessHandler(resp?.data);
			} else {
				setShowPendingModal(true);
				if (count.current < 10) {
					count.current += 1;
					setTimeout(async () => {
						await checkPaymentStatus();
					}, 2000);
				} else {
					setStop(true);
					Toast.warn('Payment is Pending', {
						autoClose : 3000,
						style     : { background: '#ffffe5' },
					});
				}
			}
			return resp?.data;
		} catch (err) {
			Toast.error(err?.error?.message);
			return null;
		}
	}, [billId, paymentSuccessHandler, setShowPendingModal, trigger]);

	useEffect(() => {
		if (billId) {
			checkPaymentStatus();
		}
	}, [billId, checkPaymentStatus]);

	return {
		checkPaymentStatus,
		checkPaymentLoading: loading,
		stop,
	};
};

export default useCheckPaymentStatus;
