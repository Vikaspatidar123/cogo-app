import { Toast } from '@cogoport/components';
import { useState } from 'react';

import { useRouter } from '@/packages/next';
import { useRequestBf } from '@/packages/request';
import { useSelector } from '@/packages/store';
import paymentInitiation from '@/ui/commons/components/PaymentInitiation';

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
	const [buttonLoading, setButtonLoading] = useState(false);
	const [modal, setModal] = useState({});
	const [{ data, loading }, trigger] = useRequestBf(
		{
			url     : '/saas/payment',
			authKey : 'post_saas_payment',
			method  : 'post',
		},
		{ manual: true },
	);

	const callBackUrl = `${process.env.NEXT_PUBLIC_APP_URL}/${org_id}/${branch_id}/${account_type}/`
                   + 'saas/premium-services/trader-eligibility-check/result';

	const initiatePayment = async ({
		res = {},
		services: serviceRates = {},		productCodes = {},
		address = {},
	}) => {
		const info = res?.data || {};
		const { services = {}, currency = '' } = serviceRates;
		const { buyer_eligibility_check = {} } = services || {};
		const { price = 0, discount = 0 } = buyer_eligibility_check || {};
		const discountAmount = (+discount * +price) / 100;
		const isBillingAddress = !!address?.tax_number;
		const addressKey = isBillingAddress
			? 'organizationBillingAddressId'
			: 'organizationAddressId';
		try {
			const resp = await trigger({
				data: {
					source                : 'SAAS',
					userId                : id,
					organizationId        : organization?.id,
					currency,
					billRefId             : info?.id,
					billType              : 'PREMIUM_SERVICES',
					[addressKey]          : address?.id || address?.organization_id,
					userName              : name,
					userEmail             : email,
					userMobile            : mobile_number,
					userMobileCountryCode : mobile_country_code,
					redirectUrl           : callBackUrl,
					totalAmount           : +price % 1 !== 0 ? +price.toFixed(2) : +price,
					taxAmount:
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
							taxAmount:
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
				setButtonLoading(true);
				paymentInitiation({
					data: resp?.data,
					setModal,
					setButtonLoading,
				});
			}
		} catch (err) {
			Toast.error('We could not initiate payment right now!!! Please try again later');
		}
	};
	return {
		initiatePayment,
		data,
		loading: buttonLoading || loading,
		modal,
		setModal,
	};
};
export default usePayment;
