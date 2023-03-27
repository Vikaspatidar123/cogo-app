import { Toast } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect, useCallback, useRef } from 'react';

import { useRequestBf } from '@/packages/request';

const useCheckStatus = ({ query = '', setModal = () => {}, insurance = () => {} }) => {
	const [stop, setStop] = useState(false);
	const [paymentStatus, setPaymentStatus] = useState('');
	const [{ loading }, trigger] = useRequestBf(
		{
			method  : 'get',
			url     : '/saas/bill/status',
			authKey : 'get_saas_bill_status',
		},
		{ manual: true },
	);

	const { billId = '' } = query || {};
	const ref = useRef(0);

	const checkPaymentStatus = useCallback(async () => {
		try {
			if (!isEmpty(billId)) {
				setModal((prev) => ({
					...prev,
					pendingModal: true,
				}));
				const res = await trigger({
					params: { billId },
				});

				if (res?.data?.status === 'PAID') {
					await setPaymentStatus(res?.data?.status);
					await insurance(res?.data?.billRefId, billId, setModal);
				} else {
					setModal((prev) => ({
						...prev,
						pendingModal: true,
					}));
					if (ref.current < 10) {
						ref.current += 1;
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
			}
		} catch (err) {
			setModal((prev) => ({
				...prev,
				pendingModal: true,
			}));
			setPaymentStatus('ERROR');
			Toast.error(err?.error?.message);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [billId]);

	useEffect(() => {
		checkPaymentStatus();
	}, [checkPaymentStatus]);

	return {
		checkLoading: loading,
		stop,
		paymentStatus,
	};
};
export default useCheckStatus;
