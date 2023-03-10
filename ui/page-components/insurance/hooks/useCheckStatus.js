import { Toast } from '@cogoport/components';
import { useState, useEffect } from 'react';

import { useRequestBf } from '@/packages/request';

const useCheckStatus = ({ query, setModal, insurance }) => {
	const [stop, setStop] = useState(false);
	const [paymentStatus, setPaymentStatus] = useState('');
	const [{ data, loading }, trigger] = useRequestBf(
		{ method: 'get', url: '/saas/bill/status', authKey: 'get_saas_bill_status' },
		{ manual: true },
	);

	const { billId = '' } = query || {};
	let count = 0;

	const checkPaymentStatus = async () => {
		setModal((prev) => ({
			...prev,
			pendingModal: true,
		}));
		try {
			const res = await trigger({
				params: { billId },
			});

			if (res?.data?.status === 'PAID') {
				setPaymentStatus(res?.data?.status);
				await insurance(res?.data?.billRefId, billId, setModal);
			} else {
				setModal((prev) => ({
					...prev,
					pendingModal: true,
				}));
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
			setModal((prev) => ({
				...prev,
				pendingModal: true,
			}));
			setPaymentStatus('ERROR');
			Toast.error(err?.error?.message);
		}
	};

	useEffect(() => {
		if (billId) checkPaymentStatus();
	});
	return {
		checkPaymentStatus,
		data,
		checkLoading: loading,
		stop,
		paymentStatus,
	};
};
export default useCheckStatus;
