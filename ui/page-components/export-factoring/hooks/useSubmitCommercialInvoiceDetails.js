import { Toast } from '@cogoport/components';

import { useRequest } from '@/packages/request';

const useSubmitCommercialInvoiceDetails = ({
	refetch,
	sid,
	creditRequest,

	setOpenAddInvoice,
}) => {
	const [{ loading }, trigger] = useRequest(
		{
			method : 'post',
			url    : 'update_credit_application',
		},
		{ manual: true },
	);

	const onSubmit = async (values) => {
		try {
			const export_factoring_service_attributes = {
				section_to_update        : 'invoice_document_details',
				invoice_document_details : {
					shipment_serial_id : sid,
					commercial_invoice : values?.addInvoice?.map((x) => ({
						document_number : x?.invoice_no,
						invoice_amount  : {
							currency : x?.credit_limit?.currency,
							amount   : x?.credit_limit?.price,
						},
					})),
				},
			};

			const payload = {
				credit_id: creditRequest?.credit_id,
				export_factoring_service_attributes,
			};

			await trigger({
				data: { ...payload },
			});
			setOpenAddInvoice(false);
			Toast.success('Successfully submitted');
			refetch();
		} catch (err) {
			Toast.error(err.data);
		}
	};

	return {
		onSubmit,
		loading,
	};
};

export default useSubmitCommercialInvoiceDetails;
