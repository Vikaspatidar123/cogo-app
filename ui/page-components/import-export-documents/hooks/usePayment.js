import { Toast } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import useGetProductCode from './useGetProductCodes';

import { useRouter } from '@/packages/next';
import { useRequestBf } from '@/packages/request';
import { useSelector } from '@/packages/store';
import paymentInitiation from '@/ui/commons/components/PaymentInitiation';

const usePayment = ({ hsCode = '', address = {} }) => {
	const { query } = useRouter();

	const { t } = useTranslation(['importExportDoc']);

	const { profile } = useSelector((state) => state);
	const { id, name, email, mobile_number, mobile_country_code } = profile || {};
	const { org_id = '', branch_id = '', trade_engine_id } = query || {};

	// eslint-disable-next-line max-len
	const callBackUrl1 = `${process.env.NEXT_PUBLIC_APP_URL}/${org_id}/${branch_id}/saas/premium-services/import-export-doc`;
	// eslint-disable-next-line max-len
	const callBackUrl2 = `${process.env.NEXT_PUBLIC_APP_URL}/${org_id}/${branch_id}/saas/premium-services/import-export-doc/${trade_engine_id}/result`;

	const [buttonLoading, setButtonLoading] = useState(false);
	const [modal, setModal] = useState({});

	const { getProductCode, getProductCodeLoading } = useGetProductCode();

	const [{ loading }, trigger] = useRequestBf({
		method  : 'post',
		url     : '/saas/payment',
		authKey : 'post_saas_payment',
	}, { manual: true });

	const getServiceDataHandler = async () => {
		const resp = await getProductCode();
		return resp?.import_export_documents?.id;
	};

	const initiatePayment = async ({
		currency = 'INR',
		price = 0,
		gstAmount = 0,
		amount = 0,
		totalAmount = 0,
	}) => {
		const isBillingAddress = !!address?.tax_number;
		const addressKey = isBillingAddress
			? 'organizationBillingAddressId'
			: 'organizationAddressId';
		try {
			const importExportId = await getServiceDataHandler();
			const resp = await trigger({
				data: {
					userId                : id,
					organizationId        : profile?.organization.id,
					currency,
					billRefId             : trade_engine_id,
					userName              : name,
					userEmail             : email,
					userMobile            : mobile_number,
					userMobileCountryCode : mobile_country_code,
					redirectUrl           : hsCode ? callBackUrl1 : callBackUrl2,
					billType              : 'PREMIUM_SERVICES',
					[addressKey]          : address?.id || address?.organization_id,
					source                : 'SAAS',
					billLineItems         : [
						{
							description    : 'import_export_documents',
							displayName    : 'Import Export Documents',
							productCodeId  : importExportId,
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
				paymentInitiation({
					data: resp?.data,
					setModal,
					setButtonLoading,
				});
			}
		} catch (err) {
			Toast.error(t('importExportDoc:api_error'));
		}
	};

	return {
		initiatePayment,
		paymentLoading: loading || getProductCodeLoading || buttonLoading,
		modal,
		setModal,
	};
};

export default usePayment;
