import { Toast } from '@cogoport/components';

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

	const [{ loading, data }, trigger] = useRequestBf({
		url     : '/saas/payment',
		authKey : 'post_saas_payment',
		method  : 'post',
	}, { manual: true });

	const callBackUrl = `${process.env.NEXT_PUBLIC_APP_URL}v2/${org_id}/${branch_id}/${account_type}/saas/premium-services/duties-taxes-calculator`;

	const refectPayment = async ({
		currency = 'INR',
		price = 0,
		gstAmount = 0,
		amount = 0,
		totalAmount = 0,
		billRefId = '',
	}) => {
		try {
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
							pricePerUnit   : price,
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
	return { refectPayment, paymentLoading: loading };
};

export default usePayment;
