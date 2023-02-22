import { Toast } from '@cogoport/components';

import { useRouter } from '@/packages/next';

// import { useSaasState } from '../../../common/context';

import { useRequestBf } from '@/packages/request';
import { useSelector } from '@/packages/store';

const usePayment = () => {
	const { profile = {} } = useSelector((s) => s);

	const {
		id = '',
		organization = {},
		name = '',
		email = '',
		mobile_number = '',
		mobile_country_code = '',
	} = profile;
	const { query } = useRouter();
	const { org_id = '', branch_id = '', account_type = '' } = query || {};
	// const { trigger, data, loading } = useRequest('post', false, 'saas', {
	// 	authkey: 'post_saas_payment',
	// })('/saas/payment');

	const [{ data, loading }, trigger] = useRequestBf({
		url     : '/saas/payment',
		authKey : 'post_saas_payment',
		method  : 'post',
	}, { manual: true });

	const callBackUrl = `${process.env.APP_URL}app/${org_id}/${branch_id}/${account_type}/saas/premium-services/trader-eligibility-check/result`;

	const initiatePayment = async ({ res = {}, services = {}, productCodes = {} }) => {
		const info = res?.data || {};
		const { buyer_eligibility_check } = services || {};
		const { price = 0, discount = 0 } = buyer_eligibility_check || {};
		const discountAmount = (+discount * +price) / 100;
		try {
			const resp = await trigger({
				data: {
					source                : 'SAAS',
					userId                : id,
					organizationId        : organization?.id,
					currency              : 'INR',
					billRefId             : info?.id,
					billType              : 'PREMIUM_SERVICES',
					userName              : name,
					userEmail             : email,
					userMobile            : mobile_number,
					userMobileCountryCode : mobile_country_code,
					redirectUrl           : callBackUrl,
					totalAmount           : +price % 1 !== 0 ? +price.toFixed(2) : +price,
					taxAmount             :
						((+price % 1 !== 0 ? price.toFixed(2) : +price)
							- (+discountAmount % 1 !== 0
								? +discountAmount.toFixed(2)
								: +discountAmount))
						* 0.18,
					subTotalAmount:
						(+price % 1 !== 0 ? price.toFixed(2) : +price)
						- (+discountAmount % 1 !== 0 ? +discountAmount.toFixed(2) : +discountAmount),
					netAmount:
						((+price % 1 !== 0 ? price.toFixed(2) : +price)
							- (+discountAmount % 1 !== 0
								? +discountAmount.toFixed(2)
								: +discountAmount))
						* 1.18,
					discountAmount,
					billLineItems: [
						{
							productCodeId : productCodes?.trader_eligibility_check?.id,
							description   : 'buyer_eligibility_check',
							displayName   : 'Buyer Eligibility Check',
							pricePerUnit  : +price % 1 !== 0 ? +price.toFixed(2) : +price,
							quantity      : 1,
							totalAmount   : +price % 1 !== 0 ? +price.toFixed(2) : +price,
							taxAmount     :
								((+price % 1 !== 0 ? price.toFixed(2) : +price)
									- (+discountAmount % 1 !== 0
										? +discountAmount.toFixed(2)
										: +discountAmount))
								* 0.18,
							subTotalAmount:
								(+price % 1 !== 0 ? price.toFixed(2) : +price)
								- (+discountAmount % 1 !== 0
									? +discountAmount.toFixed(2)
									: +discountAmount),
							netAmount:
								((+price % 1 !== 0 ? price.toFixed(2) : +price)
									- (+discountAmount % 1 !== 0
										? +discountAmount.toFixed(2)
										: +discountAmount))
								* 1.18,
							discountAmount,
							metadata: '',
						},
					],
				},
			});
			if (resp?.data) {
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
	return { initiatePayment, data, loading };
};
export default usePayment;
