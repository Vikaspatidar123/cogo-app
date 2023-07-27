import { Toast } from '@cogoport/components';

import { TERMS_AND_CONDITIONS } from '../components/Invoices/components/InvoiceDetails/common/constant';

import { useRequest } from '@/packages/request';

const getDocExtention = (url) => url.split('.').pop();

const useSaveSbDocsDetails = ({
	data: invoiceData,
	setShowSbForm = () => {},
	showSbForm,
	is_deleted = false,
	doc = {},
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
			document_url         : value.shipping_bill,
			document_extension   : getDocExtention(value.shipping_bill),
			document_number      : value?.sb_number,
			document_date        : value?.sb_date,
			terms_and_conditions : TERMS_AND_CONDITIONS,
		};
	};

	const onSbDocSave = async (value) => {
		let invoice_document_details = {};
		invoice_document_details = {
			shipment_serial_id : invoiceData?.shipment_details?.shipment_serial_id,
			invoice_id         : invoiceData?.id,
			shipping_bill      : [filterinvoice(is_deleted, value)],
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
			setShowSbForm(showSbForm === false);
			refetch();
			Toast.success('Details Saved');
		} catch (err) {
			Toast.error(err.data);
		}
	};
	return {
		onSbDocSave,
		loading,
	};
};

export default useSaveSbDocsDetails;
