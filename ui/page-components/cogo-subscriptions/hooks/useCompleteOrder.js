import { Toast } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import { loadScript } from '../utils/loadScript';
import redirectUrl from '../utils/redirectUrl';

import { useRequest } from '@/packages/request';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const CHARGEBEE_JS_URL = 'https://js.chargebee.com/v2/chargebee.js';

const getPayload = ({
	checkout_id,
	saas_subscription_customer_id,
	datePickerValue,
	checked,
	profile,
	addressKey,
	callback_url,
	couponCode,
}) => {
	const { branch = {}, organization = {}, id = '' } = profile || {};
	return {
		checkout_id,
		subscription_customer_id : saas_subscription_customer_id,
		[addressKey]             : checked?.[GLOBAL_CONSTANTS.zeroth_index],
		organization_branch_id   : branch?.id,
		start_date               : datePickerValue?.toString(),
		is_promo_applied         : !isEmpty(couponCode),
		organization_id          : organization?.id,
		performed_by_id          : id,
		platform                 : 'app',
		callback_url,
	};
};

const useCompleteOrder = ({
	checked,
	profile,
	checkoutResponse,
	datePickerValue,
	isBillingAddress,
}) => {
	const [checkoutModal, setCheckoutModal] = useState(false);
	const [stripeModal, setStripeModal] = useState(false);
	const [responseForCheckout, setResponseForCheckout] = useState();

	const environment =	process.env.NEXT_PUBLIC_APP_BASE_URL !== 'https://api.cogoport.com';
	const key = environment ? 'uat' : 'pay';

	const { getCallBackUrl } = redirectUrl();

	const { checkout_id, saas_subscription_customer_id } = checkoutResponse || {};

	const callback_url = getCallBackUrl(checkout_id);

	const [{ loading, data }, trigger] = useRequest({
		url    : '/saas_complete_order',
		method : 'post',
	}, { manual: true });

	const addressKey = isBillingAddress
		? 'billing_address_id'
		: 'organization_address_id';

	const completeOrder = async ({ couponCode = {}, id }) => {
		const payload = getPayload({
			checkout_id: checkout_id || id,
			saas_subscription_customer_id,
			checked,
			profile,
			datePickerValue,
			addressKey,
			callback_url,
			couponCode,
		});
		try {
			const completeOrderResponse = await trigger({
				params: payload,
			});

			if (completeOrderResponse?.data) {
				const gateway_key = completeOrderResponse?.data?.gateway;
				switch (gateway_key) {
					case 'razorpay':
						window.open(completeOrderResponse?.data?.url, '_self', '');
						break;
					case 'chargebee':
						{
							await loadScript(CHARGEBEE_JS_URL);
							// eslint-disable-next-line no-undef
							const chargebeeInstance = Chargebee.init({
								site: process.env.CHARGEBEE_SITE,
							});
							chargebeeInstance.openCheckout({
								hostedPage: () => new Promise((resolve) => {
									resolve(completeOrderResponse?.data);
								}),
							});
						}
						break;
					case 'stripe':
						window.open(completeOrderResponse?.data?.link, '_self');
						break;
					case 'checkout':
						await loadScript('https://cdn.checkout.com/js/framesv2.min.js');
						setCheckoutModal(true);
						setResponseForCheckout(completeOrderResponse?.data);
						break;
					case 'billdesk':
						Promise.all([
							loadScript(
								`https://${key}.billdesk.com/jssdk/v1/dist/billdesksdk/billdesksdk.esm.js`,
							),
							loadScript(
								`https://${key}.billdesk.com/jssdk/v1/dist/billdesksdk.js`,
							),
						])
							.then(() => {
								setTimeout(() => {
									window.loadBillDeskSdk(
										completeOrderResponse?.data?.billDeskConfig,
									);
								}, 1000);
							})
							.catch((error) => {
								console.log(error);
							});
						break;
					default:
				}
			}
		} catch (error) {
			Toast.error(error?.message);
		}
	};
	return {
		completeOrder,
		completeOrderLoading  : loading,
		checkoutModal,
		responseForCheckout,
		setCheckoutModal,
		stripeModal,
		setStripeModal,
		completeOrderResponse : data,
	};
};

export default useCompleteOrder;
