import { Toast } from '@cogoport/components';
import { useState } from 'react';

import useGetProductCode from './useGetProductCodes';

import { useRouter } from '@/packages/next';
import { useRequestBf } from '@/packages/request';
import { useSelector } from '@/packages/store';
import paymentInititation from '@/ui/commons/components/PaymentInitiation';
import getGeoConstants from '@/ui/commons/constants/geo';

const usePayment = () => {
	const { profile } = useSelector((s) => s);
	const { query } = useRouter();

	const geo = getGeoConstants();
	const DEFAULT_CURRENCY = geo.country.currency.code;
	const { id, name, email, mobile_number, mobile_country_code } = profile || {};
	const {
		org_id = '',
		branch_id = '',
		trade_engine_id,
	} = query || {};

	const [butttonLoading, setButtonLoading] = useState(false);
	const [modal, setModal] = useState({});

	const callBackUrl = `${process.env.NEXT_PUBLIC_APP_URL}${org_id}/${branch_id}/`
		+ 'saas/premium-services/import-export-controls';
	const { getProductCodeLoading, productCode = {} } = useGetProductCode();

	const [{ data, loading }, trigger] = useRequestBf({
		method  : 'post',
		url     : '/saas/payment',
		authKey : 'post_saas_payment',
	}, { manual: true });

	const { import_export_documents = {} } = productCode;

	const initiatePayment = async ({
		currency = DEFAULT_CURRENCY,
		price = 0,
		gstAmount = 0,
		amount = 0,
		totalAmount = 0,
		address = {},
	}) => {
		const isBillingAddress = !!address?.tax_number;
		const addressKey = isBillingAddress
			? 'organizationBillingAddressId'
			: 'organizationAddressId';
		try {
			const resp = await trigger({
				data: {
					userId                : id,
					organizationId        : profile?.organization.id,
					currency,
					billRefId             : trade_engine_id,
					[addressKey]          : address?.id,
					userName              : name,
					userEmail             : email,
					userMobile            : mobile_number,
					userMobileCountryCode : mobile_country_code,
					redirectUrl           : callBackUrl,
					billType              : 'PREMIUM_SERVICES',
					source                : 'SAAS',
					billLineItems         : [
						{
							description    : 'import_export_controls',
							displayName    : 'Import Export Controls',
							productCodeId  : import_export_documents?.id,
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
				},
			});
			if (resp?.data) {
				setButtonLoading(true);
				paymentInititation({ data: resp?.data, setModal, setButtonLoading });
			}
		} catch (err) {
			Toast.error('Something went wrong! Please try after sometime', {
				autoClose : 3000,
				style     : { color: '#333', background: '#FFD9D4' },
			});
		}
	};

	return {
		initiatePayment,
		paymentLoading: loading || getProductCodeLoading || butttonLoading,
		data,
		modal,
		setModal,
	};
};

export default usePayment;
