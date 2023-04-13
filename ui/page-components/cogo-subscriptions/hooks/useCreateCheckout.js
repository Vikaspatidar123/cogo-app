import { Toast } from '@cogoport/components';
import { useCallback } from 'react';

import { useRequest } from '@/packages/request';

const useCreateCheckout = () => {
	const [{ loading }, trigger] = useRequest({
		url    : '/saas_create_checkout_items',
		method : 'post',
	}, { manual: true });

	const createCheckout = useCallback(async ({
		setCheckoutResponse,
		query,
		resp,
		plan_pricing_id,
		addons = false,
		quantity,
		completeOrder = () => {},
		setStripeModal = false,
	}) => {
		let period_name;
		const { subscription_customer_id = '', pricing } = resp;

		if (query?.period === 'monthly') {
			period_name = 'month';
		} else {
			period_name = 'year';
		}

		try {
			const payload = addons
				? {
					quantity,
					saas_subscription_customer_id: subscription_customer_id,
					plan_pricing_id,
				}
				: {
					saas_subscription_customer_id : subscription_customer_id,
					plan_pricing_id               : pricing?.[`${period_name}`]?.[0]?.id,
				};
			const response = await trigger({
				params: {
					...payload,
				},
			});

			setCheckoutResponse(response?.data);
			const { checkout_id, saas_subscription_customer_id } = response.data || {};
			if (!response?.data?.errors && addons) {
				completeOrder({
					setStripeModal,
					id             : checkout_id,
					subscriptionId : saas_subscription_customer_id,
					addons,
				});
			}
			if (response?.data?.errors) {
				Toast.error('Something went wrong. Please try after sometime');
			}
		} catch (error) {
			Toast.error(error?.message || 'Something went wrong. Please try after sometime');
		}
	}, [trigger]);
	return { createCheckout, checkoutLoading: loading };
};

export default useCreateCheckout;
