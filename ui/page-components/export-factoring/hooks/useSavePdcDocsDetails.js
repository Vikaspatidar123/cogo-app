import { Toast } from '@cogoport/components';

import { TERMS_AND_CONDITIONS } from '../components/Invoices/components/InvoiceDetails/common/constant';

import { useRequest } from '@/packages/request';

const getDocExtention = (url) => url.split('.').pop();

const pdcInvoice = ({ value, invoiceData }) => ({
	id                   : invoiceData?.id,
	document_url         : value.postdated_cheque,
	document_extension   : getDocExtention(value.postdated_cheque),
	terms_and_conditions : TERMS_AND_CONDITIONS,
});

const useSavePdcDocsDetails = ({
	data: invoiceData,
	refetch,
	creditRequest,
}) => {
	const [{ loading }, trigger] = useRequest(
		{
			method : 'post',
			url    : 'update_credit_application',
		},
		{ manual: true },
	);

	const uploadDocPayload = (value) => {
		const invoice_document_details = {
			shipment_serial_id : invoiceData?.shipment_details?.shipment_serial_id,
			invoice_id         : invoiceData?.id,
			postdated_cheque   : [pdcInvoice({ value, invoiceData })],
		};

		const payload = {
			export_factoring_service_attributes: {
				section_to_update: 'invoice_document_details',
				invoice_document_details,
			},
			credit_id: creditRequest?.credit_id,
		};

		return payload;
	};

	const onPdcDocSave = async (value) => {
		try {
			const payload = uploadDocPayload(value);

			await trigger({
				data: payload,
			});
			// setCreditRequest(data?.creditRequest);
			refetch();
			Toast.success('Details Saved');
		} catch (err) {
			Toast.error(err.data);
		}
	};
	return {
		onPdcDocSave,
		loading,
	};
};

export default useSavePdcDocsDetails;
