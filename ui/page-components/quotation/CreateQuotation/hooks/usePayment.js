import { useRouter } from 'next/router';
import { useState } from 'react';

import { SERVICE_CODE_MAPPING } from '../utils/serviceMapping';

import { useRequestBf } from '@/packages/request';
import { useSelector } from '@/packages/store';
import paymentInitiation from '@/ui/commons/components/PaymentInitiation';

const createPayload1 = ({
	quoteId, billRefId, buyerDetails = {}, serviceCodeData = {}, currency, billLineItems,
	profileData, query, ...rest
}) => {
	const { id, name, email, mobile_number, mobile_country_code, organization } = profileData;
	const { org_id, branch_id } = query || {};

	const redirectUrl = [
		`${process.env.NEXT_PUBLIC_APP_URL}${org_id}/${branch_id}`,
		'saas/quickquotation/editquotation',
		quoteId,
	].join('/');

	const billLineItemsData = billLineItems.map((data, index) => (
		{ ...data, productCodeId: serviceCodeData?.[SERVICE_CODE_MAPPING[index + 1]]?.id }));

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

const usePayment = ({ buyerDetails = {} }) => {
	const { query } = useRouter();
	const profileData = useSelector((state) => state.profile);

	const [modal, setModal] = useState({});
	const [buttonLoading, setButtonLoading] = useState(false);

	const [{ loading, data: paymentData }, trigger] = useRequestBf({
		method  : 'post',
		url     : '/saas/payment',
		authKey : 'post_saas_payment',
	}, { manual: true });

	const [{ loading: serviceCodeLoading, data:serviceCodeData }] = useRequestBf({
		method  : 'get',
		url     : 'saas/bill/product-codes',
		authKey : 'get_saas_bill_product_codes',
	}, { manual: false });

	const postPayemnt = async (params) => {
		const payload = createPayload1({ ...params, query, buyerDetails, profileData, serviceCodeData });

		try {
			const resp = await trigger({
				data: payload,
			});
			setButtonLoading(true);
			paymentInitiation({ data: resp?.data, setModal, setButtonLoading });
		} catch (err) {
			console.error(err);
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
