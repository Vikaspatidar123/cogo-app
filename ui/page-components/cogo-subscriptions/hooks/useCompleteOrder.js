/* eslint-disable no-promise-executor-return */
/* eslint-disable no-undef */
import { Toast } from '@cogoport/components';

import { loadScript } from '../utils/loadScript';

import { useRequest } from '@/packages/request';

const CHARGEBEE_JS_URL = 'https://js.chargebee.com/v2/chargebee.js';

const useCompleteOrder = ({
	checked,
	profile,
	setCompleteOrderResponse = () => {},
	checkoutResponse,
	datePickerValue,
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/saas_complete_order',
		method : 'post',
	}, { manual: true });

	const completeOrder = async ({
		setStripeModal = () => {},
		id = '',
		subscriptionId = '',
		addons = false,
	}) => {
		const { checkout_id, saas_subscription_customer_id } = checkoutResponse || {};
		try {
			const completeOrderResponse = await trigger({
				params: {
					checkout_id              : checkout_id || id,
					subscription_customer_id : saas_subscription_customer_id || subscriptionId,
					billing_address_id       : checked?.[0],
					organization_branch_id   : profile?.branch?.id,
					payment_mode             : 'CARDS',
					start_date               : datePickerValue,
				},
			});
			if (completeOrderResponse?.data?.payment_order_id) {
				window.open(completeOrderResponse?.data?.url, '_self', '');
			} else {
				setCompleteOrderResponse(completeOrderResponse?.data);
				setStripeModal(true);
				if (!completeOrderResponse?.hasError && !addons) {
					await loadScript(CHARGEBEE_JS_URL);
					// eslint-disable-next-line no-undef
					const chargebeeInstance = Chargebee.init({ site: process.env.CHARGEBEE_SITE });
					chargebeeInstance.openCheckout({
						hostedPage: () => new Promise((res) => res(completeOrderResponse?.data)),
					});
				}
			}
		} catch (error) {
			Toast.error(error?.message);
		}
	};
	return { completeOrder, completeOrderLoading: loading };
};

export default useCompleteOrder;
