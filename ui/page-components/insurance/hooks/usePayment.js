/* eslint-disable no-undef */
import { Toast } from '@cogoport/components';
import { useCallback } from 'react';

import { useRouter } from '@/packages/next';
import { useRequestBf } from '@/packages/request';
import { useSelector } from '@/packages/store';
import { loadScript } from '@/ui/commons/utils/loadScript';

const usePayment = ({
	ratesResponse = {},
	organizationAddress = {},
}) => {
	const { profile = {} } = useSelector((state) => state);
	const {
		id = '',
		organization = {},
		name = '',
		email = '',
		mobile_number = '',
		mobile_country_code = '',
	} = profile;
	const { query } = useRouter();
	const { org_id = '', branch_id = '', type = '' } = query || {};
	const [{ data, loading }, trigger] = useRequestBf(
		{
			method: 'post',
			authKey: 'post_saas_payment',
			url: '/saas/payment',
		},
		{ manual: true },
	);

	const {
		taxAmount = 0,
		totalApplicableCharges = 0,
		serviceChargeList = [],
		totalCharges = 0,
	} = ratesResponse || {};

	const { organizationAddressId = '', isBillingAddress = false } = organizationAddress || {};

	const callBackUrl = `${process.env.NEXT_PUBLIC_APP_URL}v2/${org_id}/${branch_id}/saas/insurance/${type}`;

	const addressKey = isBillingAddress
		? 'organizationBillingAddressId'
		: 'organizationAddressId';

	const modifiedServiceChargesList = (serviceChargeList || []).map(
		({
			gstCharges = 0,
			netCharges = 0,
			serviceName = '',
			totalCharges: totalAmount = 0,
			productCodeId = '',
			displayName = '',
		}) => ({
			displayName,
			description: serviceName,
			pricePerUnit: totalAmount,
			quantity: 1,
			totalAmount,
			taxAmount: gstCharges,
			subTotalAmount: totalAmount,
			netAmount: netCharges,
			discountAmount: 0,
			metadata: '',
			productCodeId,
		}),
	);

	const payment = useCallback(
		async (info) => {
			await Promise.all([
				loadScript(
					'https://uat.billdesk.com/jssdk/v1/dist/billdesksdk/billdesksdk.esm.js',
				),
				loadScript('https://uat.billdesk.com/jssdk/v1/dist/billdesksdk.js'),
			]);
			try {
				const resp = await trigger({
					data: {
						source: 'SAAS',
						userId: id,
						organizationId: organization?.id,
						[addressKey]: organizationAddressId,
						currency: 'INR',
						billRefId: info?.id,
						billType: 'INSURANCE',
						userName: name,
						userEmail: email,
						userMobile: mobile_number,
						userMobileCountryCode: mobile_country_code,
						redirectUrl: callBackUrl,
						billLineItems: modifiedServiceChargesList,
						totalAmount: totalCharges,
						taxAmount,
						subTotalAmount: totalCharges,
						netAmount: totalApplicableCharges,
						discountAmount: 0,
					},
				});
				if (resp?.data) {
					if (resp?.data?.url) {
						window.open(resp.data.url, '_self', '');
					} else if (typeof window !== 'undefined' && window.loadBillDeskSdk) {
						await window.loadBillDeskSdk(resp?.data?.billDeskConfig);
					}
				}
			} catch (err) {
				Toast.error(
					'We could not initiate payment right now!!! Please try again later',
					{
						style: {
							background: '#FFD9D4',
							color: '#333',
						},
						autoClose: 5000,
					},
				);
			}
		},
		[addressKey, callBackUrl, email,
			id, mobile_country_code, mobile_number,
			modifiedServiceChargesList, name, organization?.id,
			organizationAddressId, taxAmount, totalApplicableCharges, totalCharges, trigger],
	);

	return { payment, data, loading };
};
export default usePayment;
