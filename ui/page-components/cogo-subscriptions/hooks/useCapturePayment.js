import { Toast } from '@cogoport/components';

import { useRouter } from '@/packages/next';
import { useRequest } from '@/packages/request';

const useCapturePayment = () => {
	const { query, push } = useRouter();

	const [{ loading, data }, trigger] = useRequest({
		url    : '/capture_checkout_payment',
		method : 'post',
	}, { manual: true });

	const capturePayment = async ({
		tokenGeneratedResponse = {},
		checkoutResponse = {},
		responseForCheckout = {},
		is3Denabled = false,
	}) => {
		const { checkout_id = '' } = checkoutResponse || {};
		const { token } = tokenGeneratedResponse || {};
		const { addons = false, quantity = '' } = query || {};
		try {
			const resp = await trigger({
				data: {
					token,
					order_id           : responseForCheckout?.orderId,
					saas_checkout_id   : checkout_id,
					enable_3d_security : is3Denabled,
				},
			});
			if (resp?.data) {
				// eslint-disable-next-line no-underscore-dangle
				const check = resp?.data?.checkoutPaymentResponse?._links;
				if (
					check?.redirect?.href
				) {
					window.open(
						check?.redirect
							?.href,
						'_self',
					);
				} else if (addons) {
					push(
						`/saas/cogo-subscriptions/balance-history?checkout_id=${checkout_id}&&quantity=${quantity}`,
					);
				} else {
					push(
						`/saas/cogo-subscriptions/manage-subscription?checkout_id=${checkout_id}`,
					);
				}
			}
		} catch (error) {
			Toast.error(error?.message);
		}
	};

	return { capturePayment, data, loading };
};

export default useCapturePayment;
