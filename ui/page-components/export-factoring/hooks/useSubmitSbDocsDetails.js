import { Toast } from '@cogoport/components';

import { useRequest } from '@/packages/request';

const useSubmitSbDocsDetails = ({
	data: invoiceData,
	openDocsModal,
	setOpenDocsModal,
	refetch,
	creditRequest,
}) => {
	const [{ data, loading }, trigger] = useRequest(
		{
			method : 'post',
			url    : 'send_ef_document_details_to_cogowallet',
		},
		{ manual: true },
	);

	const onSbDocSubmit = async () => {
		try {
			const payload = {
				credit_export_factoring_id : creditRequest.credit_export_factoring_id,
				shipment_serial_id         : invoiceData?.shipment_details?.shipment_serial_id,
				document_type              : 'shipping_bill',
				invoice_id                 : invoiceData?.id,
			};
			await trigger({
				data: payload,
			});
			setOpenDocsModal(openDocsModal === false);
			Toast.success('Details Successfully Submitted');
			refetch();
		} catch (err) {
			Toast.error(err.data);
		}
	};
	return {
		onSbDocSubmit,
		loading,
	};
};

export default useSubmitSbDocsDetails;
