import { Toast } from '@cogoport/components';

import { useRequest } from '@/packages/request';

const useSaveBlDocsDetails = ({
	data: invoiceData,
	setShowBlForm = () => {},
	showBlForm,
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

	const onBlDocSave = async () => {
		let invoice_document_details = {};
		invoice_document_details = {
			shipment_serial_id : invoiceData?.shipment_details?.shipment_serial_id,
			invoice_id         : invoiceData?.id,

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
