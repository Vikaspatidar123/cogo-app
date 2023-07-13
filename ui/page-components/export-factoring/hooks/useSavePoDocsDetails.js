import { Toast } from '@cogoport/components';

import { TERMS_AND_CONDITIONS } from '../components/Invoices/components/InvoiceDetails/common/constant';

import { useRequest } from '@/packages/request';

const getDocExtention = (url) => url.split('.').pop();

const useSavePoDocsDetails = ({
	data: invoiceData,
	setShowPoForm = () => {},
	showPoForm,
	is_deleted = false,
	doc = {},
	refetch,
	creditRequest,
}) => {
	const [{ data, loading }, trigger] = useRequest(
		{
			method : 'post',
			url    : 'update_credit_application',
		},
		{ manual: true },
	);

	const filterinvoice = (deleteDocument, value) => {
		if (deleteDocument) {
			return {
				id                   : doc?.id,
				is_deleted,
				document_number      : doc?.document_data?.document_number,
				document_date        : doc?.document_data?.document_date,
				document_url         : doc?.document_url,
				document_extension   : doc?.document_extension,
				terms_and_conditions : TERMS_AND_CONDITIONS,
			};
		}
		return {
			id                   : doc?.id,
			document_url         : value.purchase_order,
			document_extension   : getDocExtention(value.purchase_order),
			document_number      : value?.po_number,
			document_date        : value?.po_date,
			terms_and_conditions : TERMS_AND_CONDITIONS,
		};
	};

	const onPoDocSave = async (value) => {
		let invoice_document_details = {};
		invoice_document_details = {
			shipment_serial_id : invoiceData?.shipment_details?.shipment_serial_id,
			invoice_id         : invoiceData?.id,
			purchase_order     : [filterinvoice(is_deleted, value)],
		};

		try {
			const payload = {
				export_factoring_service_attributes: {
					section_to_update: 'invoice_document_details',
					invoice_document_details,
				},
				credit_id: creditRequest?.credit_id,
			};
			await trigger({
				data: payload,
			});
			setShowPoForm(showPoForm === false);
			refetch();
			Toast.success('Details Saved');
		} catch (err) {
			Toast.error(err.data);
		}
	};
	return {
		onPoDocSave,
		loading,
	};
};

export default useSavePoDocsDetails;
