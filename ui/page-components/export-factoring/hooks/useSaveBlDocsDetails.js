import { Toast } from '@cogoport/components';

import { TERMS_AND_CONDITIONS } from '../components/Invoices/components/InvoiceDetails/common/constant';

import { useRequest } from '@/packages/request';

const getDocExtention = (url) => url.split('.').pop();

const useSaveBlDocsDetails = ({
	data: invoiceData,
	setShowBlForm = () => {},
	showBlForm,
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

	const onBlDocSave = async (value) => {
		let invoice_document_details = {};
		invoice_document_details = {
			shipment_serial_id : invoiceData?.shipment_details?.shipment_serial_id,
			invoice_id         : invoiceData?.id,
			// purchase_order     : [filterinvoice(is_deleted, value)],
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
			setShowBlForm(showBlForm === false);
			refetch();
			Toast.success('Details Saved');
		} catch (err) {
			Toast.error(err.data);
		}
	};
	return {
		onBlDocSave,
		loading,
	};
};

export default useSaveBlDocsDetails;
