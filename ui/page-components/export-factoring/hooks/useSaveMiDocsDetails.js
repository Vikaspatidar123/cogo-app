import { Toast } from '@cogoport/components';

import { TERMS_AND_CONDITIONS } from '../components/Invoices/components/InvoiceDetails/common/constant';

import { useRequest } from '@/packages/request';

const getDocExtention = (url) => url.split('.').pop();

const useSaveMiDocsDetails = ({
	data: invoiceData,
	setShowMiForm = () => {},
	showMiForm,
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
				insuring_party_name  : doc?.document_data?.insuring_party_name,
				document_url         : doc?.document_url,
				document_extension   : doc?.document_extension,
				terms_and_conditions : TERMS_AND_CONDITIONS,
			};
		}
		return {
			id                   : doc?.id,
			document_url         : value.marine_insurance,
			document_extension   : getDocExtention(value.marine_insurance),
			document_number      : value?.mi_number,
			insuring_party_name  : value?.insuring_party_name,
			terms_and_conditions : TERMS_AND_CONDITIONS,
		};
	};

	const onMiDocSave = async (value) => {
		let invoice_document_details = {};
		invoice_document_details = {
			shipment_serial_id : invoiceData?.shipment_details?.shipment_serial_id,
			invoice_id         : invoiceData?.id,
			marine_insurance   : [filterinvoice(is_deleted, value)],
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
			setShowMiForm(showMiForm === false);
			refetch();
			Toast.success('Details Saved');
		} catch (err) {
			Toast.error(err.data);
		}
	};
	return {
		onMiDocSave,
		loading,
	};
};

export default useSaveMiDocsDetails;
