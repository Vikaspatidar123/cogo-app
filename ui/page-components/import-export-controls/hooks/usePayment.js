import { Toast } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import useGetProductCode from './useGetProductCodes';

import { useRouter } from '@/packages/next';
import { useRequestBf } from '@/packages/request';
import { useSelector } from '@/packages/store';
import paymentInititation from '@/ui/commons/components/PaymentInitiation';

const DEFAULT_QUANTITY = 1;

const createPayload = ({
	currency = '',
	price = 0,
	gstAmount = 0,
	amount = 0,
	totalAmount = 0,
	address = {},
	profile,
	query,
	productCode,
}) => {
	const { org_id = '', branch_id = '', trade_engine_id = '' } = query || {};
	const { id, name, email, mobile_number, mobile_country_code, organization } = profile || {};
	const { import_export_documents = {} } = productCode || {};

	const TOTAL_AMOUNT = price.toFixed(2);

	const amountInfo = {
		discountAmount : (+price - +amount).toFixed(2),
		subTotalAmount : amount.toFixed(2),
		taxAmount      : gstAmount.toFixed(2),
		netAmount      : totalAmount.toFixed(2),
	};

	const callBackUrl = `${process.env.NEXT_PUBLIC_APP_URL}${org_id}/${branch_id}/`
		+ 'saas/premium-services/import-export-controls';

	const isBillingAddress = !!address?.tax_number;
	const addressKey = isBillingAddress
		? 'organizationBillingAddressId'
		: 'organizationAddressId';

	return {
		userId                : id,
		organizationId        : organization?.id,
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
				description   : 'import_export_controls',
				displayName   : 'Import Export Controls',
				productCodeId : import_export_documents?.id,
				pricePerUnit  : price,
				quantity      : DEFAULT_QUANTITY,
				totalAmount   : price,
				metadata      : 'null',
				...amountInfo,
			},
		],
		totalAmount: TOTAL_AMOUNT,
		...amountInfo,

	};
};

const usePayment = () => {
	const { query } = useRouter();

	const { t } = useTranslation(['importExportControls']);

	const { profile } = useSelector((s) => s);

	const [butttonLoading, setButtonLoading] = useState(false);
	const [modal, setModal] = useState({});

	const [{ data, loading }, trigger] = useRequestBf({
		method  : 'post',
		url     : '/saas/payment',
		authKey : 'post_saas_payment',
	}, { manual: true });

	const { getProductCodeLoading, productCode = {} } = useGetProductCode();

	const initiatePayment = async (props) => {
		const payload = createPayload({ profile, query, productCode, ...props });

		try {
			const resp = await trigger({
				data: payload,
			});

			if (resp?.data) {
				setButtonLoading(true);
				paymentInititation({ data: resp?.data, setModal, setButtonLoading });
			}
		} catch (err) {
			Toast.error(t('importExportControls:api_error'));
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
