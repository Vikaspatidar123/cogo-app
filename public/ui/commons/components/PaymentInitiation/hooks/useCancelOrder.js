import { Toast } from '@cogoport/components';

import { useRequestBf } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useCancelOrder = ({ paymentInitiationResponse = {} }) => {
	const { profile = {} } = useSelector((s) => s);
	const [{ data }, trigger] = useRequestBf({
		url     : '/saas/payment/cancel-order',
		authKey : 'post_saas_payment_cancel_order',
		method  : 'post',
	}, { manual: true });

	const { saasBillId = '', saasPaymentId = '' } = paymentInitiationResponse || {};

	const cancelOrder = async () => {
		try {
			await trigger({
				data: {
					saasBillId,
					saasPaymentId,
					userId: profile?.id,
				},
			});
		} catch (error) {
			Toast.error(error?.error?.message);
		}
	};

	return { cancelOrder, data };
};

export default useCancelOrder;
