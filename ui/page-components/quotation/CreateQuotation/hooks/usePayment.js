import { useRouter } from 'next/router';

import { SERVICE_CODE_MAPPING } from '../utils/serviceMapping';

import useServiceCodes from './useServiceCodes';

import { useRequestBf } from '@/packages/request';
import { useSelector } from '@/packages/store';

const usePayment = () => {
	const { id, name, email, mobile_number, mobile_country_code, organization } = useSelector((state) => state.profile);
	const { query } = useRouter();
	const { org_id, branch_id } = query || {};

	const { getServiceCode, serviceCodeLoading } = useServiceCodes();

	const [{ loading }, trigger] = useRequestBf({
		method  : 'post',
		url     : '/saas/payment',
		authKey : 'post_saas_payment',
	}, { manual: true });

	const getServiceDataHandler = async ({ billLineItems }) => {
		const resp = await getServiceCode();
		const payload = billLineItems.map((data, index) => (
			{ ...data, productCodeId: resp?.[SERVICE_CODE_MAPPING[index + 1]]?.id }));
		return payload;
	};

	const postPayemnt = async ({ quoteId, billRefId, currency, billLineItems, ...rest }) => {
		const redirectUrl = `${process.env.NEXT_PUBLIC_APP_URL}${org_id}/${branch_id}
		/saas/quickquotation/editquotation/${quoteId}`;

		const billLineItemsData = await getServiceDataHandler({ billLineItems });

		try {
			const resp = await trigger({
				data: {
					userId                : id,
					billRefId,
					currency,
					organizationId        : organization?.id,
					userName              : name,
					userEmail             : email,
					userMobile            : mobile_number,
					userMobileCountryCode : mobile_country_code,
					redirectUrl,
					billType              : 'PREMIUM_SERVICES',
					billLineItems         : billLineItemsData,
					source                : 'SAAS',
					...rest,
				},
			});
			const { url: link } = resp?.data || {};

			if (link) {
				// eslint-disable-next-line no-undef
				window.open(link, '_self', '');
			}
		} catch (err) {
			console.log(err);
		}
	};
	return {
		postPayemnt,
		paymentLoading: loading || serviceCodeLoading,
	};
};

export default usePayment;
