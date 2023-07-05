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
}) => {
	const [{ data, loading }, trigger] = useRequest(
		{
			method : 'post',
			url    : 'update_credit_application',
		},
		{ manual: true },
	);

	const onBlDocSave = async (value) => {
        console.log(value, 'kkk');
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
				// credit_id: creditRequest?.credit_id,
				credit_id: 'e7bb79a0-6534-41f7-95e9-cbbd98044043',
			};
			await trigger({
				data: payload,
			});
			// setCreditRequest(data?.creditRequest);
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
