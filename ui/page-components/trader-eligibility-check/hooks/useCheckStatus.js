import { Toast } from '@cogoport/components';
import { useState } from 'react';

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
	let count = 0;

	const checkPaymentStatus = async () => {
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
				if (count < 10) {
					count += 1;
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
	};

	return {
		checkPaymentStatus,
		data,
		checkLoading: loading,
		stop,
		paymentStatus,
	};
};
export default useCheckStatus;
