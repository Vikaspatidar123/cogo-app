import { Toast } from '@cogoport/components';

import { TERMS_AND_CONDITIONS } from '../components/Invoices/components/InvoiceDetails/common/constant';

import { useRequest } from '@/packages/request';

const getDocExtention = (url) => url.split('.').pop();

const useSubmitFundingRequest = ({
	refetch,
	data: invoiceData,
	exporterSignatory,
	signingMode,
	receivableModal,
	setReceivableModal,
}) => {
	const { documents = {}, offer_receivable_details = {} } = invoiceData || {};
	const { offer_receivable = [] } = documents;
	const { document_url = '', document_extension = '' } =		offer_receivable?.[0] || {};
	const {
		offer_receivable_signatory = [],
		exporter_signed_offer_receivable = {},
	} = offer_receivable_details;

	const [{ data, loading }, trigger] = useRequest(
		{
			method : 'post',
			url    : 'update_credit_application',
		},
		{ manual: true },
	);

	const onSubmit = async (val) => {
		try {
			const payload = {
				export_factoring_service_attributes: {
					section_to_update                  : 'offer_receivable_signatory_details',
					offer_receivable_signatory_details : {
						shipment_serial_id    : invoiceData?.shipment_details?.shipment_serial_id,
						invoice_id            : invoiceData?.id,
						preferred_mode        : signingMode,
						signing_authority_id  : exporterSignatory,
						document_signatory_id : offer_receivable_signatory?.[0]?.id,
						document_url:
							signingMode === 'digital' ? document_url : val?.signedLetter?.url,
						document_extension:
							signingMode === 'digital'
								? document_extension
								: getDocExtention(val?.signedLetter),
						document_id               : exporter_signed_offer_receivable?.id,
						signing_authority_details : {
							name                : val?.name,
							designation         : val?.designation,
							mobile_country_code : val?.mobile_number?.country_code,
							mobile_number       : val?.mobile_number?.number,
							email               : val?.email,
						},
					},
				},
				// credit_id: creditRequest?.credit_id,
				credit_id: 'e7bb79a0-6534-41f7-95e9-cbbd98044043',

			};

			await trigger({
				data: payload,
			});
			// setCreditRequest(data?.creditRequest);
			setReceivableModal((pv) => !pv);
			refetch();
			Toast.success('Successfully submitted');
		} catch (err) {
			Toast.error(err.data);
		}
	};
	return {
		onSubmit,
		loading,
	};
};

export default useSubmitFundingRequest;
