import { Toast } from '@cogoport/components';

import { TERMS_AND_CONDITIONS } from '../components/Invoices/components/InvoiceDetails/common/constant';

import { useRequest } from '@/packages/request';

const useFetchOfferReceivablesReports = ({
	setCurrentStep = () => {},
	refetch,
	creditRequest,
	data: invoiceData,
}) => {
	const [{ data, loading }, trigger] = useRequest(
		{
			method : 'post',
			url    : 'update_credit_application',
		},
		{ manual: true },
	);

	const onSubmit = async () => {
		try {
			const payload = {
				export_factoring_service_attributes: {
					section_to_update        : 'invoice_document_details',
					invoice_document_details : {
						shipment_serial_id : invoiceData?.shipment_details?.shipment_serial_id,
						invoice_id         : invoiceData?.id,
						offer_receivable   : [
							{
								terms_and_conditions : TERMS_AND_CONDITIONS,
								id                   : invoiceData?.documents?.offer_receivable?.[0]?.id,
							},
						],
					},
				},
				credit_id: creditRequest?.credit_id,
			};
			await trigger({
				data: payload,
			});
			refetch();
			setCurrentStep('signing');
			Toast.success('Report Successfully Generated');
		} catch (err) {
			Toast.error(err.data);
		}
	};
	return {
		onSubmit,
		loading,
	};
};

export default useFetchOfferReceivablesReports;
