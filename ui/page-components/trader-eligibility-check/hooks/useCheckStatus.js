import { Toast } from '@cogoport/components';
import { useCallback, useRef, useState } from 'react';

import { useRequestBf } from '@/packages/request';

const useCheckStatus = ({ query, setPaymentStatusModal, createTradeEngine }) => {
	const [stop, setStop] = useState(false);
	const [paymentStatus, setPaymentStatus] = useState('');

	const [{ data, loading }, trigger] = useRequestBf({
		url     : '/saas/bill/status',
		authKey : 'get_saas_bill_status',
		method  : 'get',
	}, { manual: true });

	const { billId = '' } = query || {};

	const count = useRef(0);

	const checkPaymentStatus = useCallback(async () => {
		setPaymentStatusModal(true);
		try {
			const res = await trigger({
				params: { billId },
			});
			if (res?.data?.status === 'PAID') {
				setPaymentStatus(res?.data?.status);
				createTradeEngine({
					paymentResponse : res,
					billId,
					draftId         : res?.data?.billRefId,
				});
			} else {
				setPaymentStatusModal(true);
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
		} catch (err) {
			setPaymentStatusModal(true);
			setPaymentStatus('ERROR');
			Toast.error(err?.error?.message);
		}
	}, [billId, createTradeEngine, setPaymentStatusModal, trigger]);

	return {
		checkPaymentStatus,
		data,
		checkLoading: loading,
		stop,
		paymentStatus,
	};
};
export default useCheckStatus;
