import { Toast } from '@cogoport/components';

import useServiceCode from './useServiceCode';

import { useRouter } from '@/packages/next';
import { useRequestBf } from '@/packages/request';
import { useSelector } from '@/packages/store';

const usePayment = () => {
	const { profile } = useSelector((s) => s);
	const { query } = useRouter();
	const {
		id, name, email, mobile_number, mobile_country_code,
	} = profile || {};
	const { org_id = '', branch_id = '', account_type = '' } = query || {};

	const { getServiceCode, serviceCodeLoading } = useServiceCode();

	const [{ loading }, trigger] = useRequestBf({
		url     : '/saas/payment',
		authKey : 'post_saas_payment',
		method  : 'post',
	}, { manual: true });

	// eslint-disable-next-line max-len
	const callBackUrl = `${process.env.NEXT_PUBLIC_APP_URL}/v2/${org_id}/${branch_id}/${account_type}saas/premium-services/duties-taxes-calculator`;

	const getServiceDataHandler = async () => {
		const resp = await getServiceCode();
		return resp?.duties_and_taxes_calculation?.id;
	};

	const refectPayment = async ({
		currency = 'INR',
		price = 0,
		gstAmount = 0,
		amount = 0,
		totalAmount = 0,
		billRefId = '',
	}) => {
		try {
			const dutiesTaxesProductId = await getServiceDataHandler();
			const resp = await trigger({
				data: {
					userId                : id,
					organizationId        : profile?.organization.id,
					currency,
					billRefId,
					userName              : name,
					userEmail             : email,
					userMobile            : mobile_number,
					userMobileCountryCode : mobile_country_code,
					redirectUrl           : callBackUrl,
					billType              : 'PREMIUM_SERVICES',
					billLineItems         : [
						{
							description    : 'duties_and_taxes',
							displayName    : 'Duties and Taxes',
							pricePerUnit   : price,
							productCodeId  : dutiesTaxesProductId,
							quantity       : 1,
							totalAmount    : price,
							discountAmount : (+price - +amount).toFixed(2),
							subTotalAmount : amount.toFixed(2),
							taxAmount      : gstAmount.toFixed(2),
							netAmount      : totalAmount.toFixed(2),
							metadata       : 'null',
						},
					],
					totalAmount    : price.toFixed(2),
					discountAmount : (+price - +amount).toFixed(2),
					subTotalAmount : amount.toFixed(2),
					taxAmount      : gstAmount.toFixed(2),
					netAmount      : totalAmount.toFixed(2),
					source         : 'SAAS',
				},
			});
			if (resp?.data) {
				/* eslint-disable no-undef */
				window.open(resp?.data?.url, '_self', '');
			}
		} catch (err) {
			console.log(err?.error?.message);
			Toast.error('Something went wrong! Please try after sometime', {
				autoClose : 3000,
				style     : { color: '#333', background: '#FFD9D4' },
			});
		}
	};
	return { refectPayment, paymentLoading: loading || serviceCodeLoading };
};

export default usePayment;
