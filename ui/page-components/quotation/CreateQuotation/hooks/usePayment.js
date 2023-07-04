import { useRouter } from 'next/router';
import { useState } from 'react';

import { SERVICE_CODE_MAPPING } from '../utils/serviceMapping';

import useServiceCodes from './useServiceCodes';

import { useRequestBf } from '@/packages/request';
import { useSelector } from '@/packages/store';
import paymentInitiation from '@/ui/commons/components/PaymentInitiation';

const usePayment = ({ buyerDetails = {} }) => {
	const { query } = useRouter();
	const { id, name, email, mobile_number, mobile_country_code, organization } = useSelector((state) => state.profile);

	const [modal, setModal] = useState({});
	const [buttonLoading, setButtonLoading] = useState(false);

	const { org_id, branch_id } = query || {};

	const { getServiceCode, serviceCodeLoading } = useServiceCodes();

	const [{ loading, data: paymentData }, trigger] = useRequestBf({
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

	const createPayload = async ({ quoteId, billRefId, currency, billLineItems, ...rest }) => {
		const redirectUrl = [
			`${process.env.NEXT_PUBLIC_APP_URL}${org_id}/${branch_id}`,
			'saas/quickquotation/editquotation',
			quoteId,
		].join('/');

		const billLineItemsData = await getServiceDataHandler({ billLineItems });

		const isBillingAddress = !!buyerDetails?.taxNumber;
		const addressKey = isBillingAddress
			? 'organizationBillingAddressId'
			: 'organizationAddressId';

		return {
			userId                : id,
			billRefId,
			currency,
			organizationId        : organization?.id,
			[addressKey]          : buyerDetails?.id,
			userName              : name,
			userEmail             : email,
			userMobile            : mobile_number,
			userMobileCountryCode : mobile_country_code,
			redirectUrl,
			billType              : 'PREMIUM_SERVICES',
			billLineItems         : billLineItemsData,
			source                : 'SAAS',
			...rest,
		};
	};

	const postPayemnt = async (params) => {
		const payload = await createPayload(params);

		try {
			const resp = await trigger({
				data: payload,
			});
			setButtonLoading(true);
			paymentInitiation({ data: resp?.data, setModal, setButtonLoading });
		} catch (err) {
			console.log(err);
		}
	};
	return {
		postPayemnt,
		modal,
		setModal,
		paymentLoading: loading || serviceCodeLoading || buttonLoading,
		paymentData,
	};
};

export default usePayment;
