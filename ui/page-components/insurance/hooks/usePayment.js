import { Toast } from '@cogoport/components';
import { useSelector } from 'react-redux';

import { useRouter } from '@/packages/next';
import { useRequest } from '@/packages/request';

const usePayment = ({ ratesResponse = {}, isBillingAddress = false, checked = [] }) => {
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
	const { org_id = '', branch_id = '', account_type = '', type = '' } = query || {};
	const [{ data, loading }, trigger] = useRequest({
		method  : 'post',
		authKey : 'post_saas_payment',
		url     : '/saas/payment',
	}, { manual: true });

	const {
		taxAmount = 0,
		totalApplicableCharges = 0,
		serviceChargeList = [],
		totalCharges = 0,
	} = ratesResponse || {};
	const callBackUrl = `${process.env.APP_URL}app/${org_id}/${branch_id}/${account_type}/saas/insurance/${type}`;

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
			description    : serviceName,
			pricePerUnit   : totalAmount,
			quantity       : 1,
			totalAmount,
			taxAmount      : gstCharges,
			subTotalAmount : totalAmount,
			netAmount      : netCharges,
			discountAmount : 0,
			metadata       : '',
			productCodeId,
		}),
	);

	const payment = async (info) => {
		try {
			const resp = await trigger({
				data: {
					source                : 'SAAS',
					userId                : id,
					organizationId        : organization?.id,
					[addressKey]          : checked?.[0],
					currency              : 'INR',
					billRefId             : info?.id,
					billType              : 'INSURANCE',
					userName              : name,
					userEmail             : email,
					userMobile            : mobile_number,
					userMobileCountryCode : mobile_country_code,
					redirectUrl           : callBackUrl,
					billLineItems         : modifiedServiceChargesList,
					totalAmount           : totalCharges,
					taxAmount,
					subTotalAmount        : totalCharges,
					netAmount             : totalApplicableCharges,
					discountAmount        : 0,
				},
			});
			if (resp?.data) {
				// eslint-disable-next-line no-undef
				window.open(resp.data.url, '_self', '');
			}
		} catch (err) {
			Toast.error('We could not initiate payment right now!!! Please try again later', {
				style: {
					background : '#FFD9D4',
					color      : '#333',
				},
				autoClose: 5000,
			});
		}
	};
	return { payment, data, loading };
};
export default usePayment;
