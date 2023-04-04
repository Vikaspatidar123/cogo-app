import { Toast } from '@cogoport/components';
import { useState } from 'react';

import { useRequestBf } from '@/packages/request';

const useCheckPaymentStatus = ({
	setShowPendingModal,
	paymentSuccessHandler,
	billId,
}) => {
	const [stop, setStop] = useState(false);

	let count = 0;

	const [{ loading }, trigger] = useRequestBf({
		method  : 'get',
		url     : 'saas/bill/status',
		authKey : 'get_saas_bill_status',
	}, { manual: true });

	const checkPaymentStatus = async () => {
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
			return resp?.data;
		} catch (err) {
			console.log(err?.error?.message);
			return null;
		}
	};

	return {
		checkPaymentLoading: loading,
		stop,
		checkPaymentStatus,
	};
};

export default useCheckPaymentStatus;
