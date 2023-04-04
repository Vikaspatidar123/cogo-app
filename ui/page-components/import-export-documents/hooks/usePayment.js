import { Toast } from '@cogoport/components';
import { useRouter } from 'next/router';

import useGetProductCode from './useGetProductCodes';

import { useRequestBf } from '@/packages/request';
import { useSelector } from '@/packages/store';

const usePayment = ({ hsCode = '' }) => {
	const { profile } = useSelector((state) => state);
	const { query } = useRouter();
	const { id, name, email, mobile_number, mobile_country_code } = profile || {};
	const { org_id = '', branch_id = '', account_type = '', trade_engine_id } = query || {};
	// eslint-disable-next-line max-len
	const callBackUrl1 = `${process.env.APP_URL}app/${org_id}/${branch_id}/${account_type}/saas/premium-services/import-export-doc`;
	// eslint-disable-next-line max-len
	const callBackUrl2 = `${process.env.APP_URL}app/${org_id}/${branch_id}/${account_type}/saas/premium-services/import-export-doc/${trade_engine_id}/result`;

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
				window.open(resp?.data?.url, '_self', '');
			}
		} catch (err) {
			Toast.error('Something went wrong! Please try after sometime', {
				autoClose : 3000,
				style     : { color: '#333', background: '#FFD9D4' },
			});
		}
	};

	return { initiatePayment, paymentLoading: loading || getProductCodeLoading };
};

export default usePayment;
