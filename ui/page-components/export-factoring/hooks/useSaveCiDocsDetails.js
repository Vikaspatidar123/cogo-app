import { Toast } from '@cogoport/components';

import { TERMS_AND_CONDITIONS } from '../components/Invoices/components/InvoiceDetails/common/constant';

import { useRequest } from '@/packages/request';

const getDocExtention = (url) => url.split('.').pop();

const useSaveCiDocsDetails = ({
	data: invoiceData,
	refetch,
}) => {
	const [{ data, loading }, trigger] = useRequest(
		{
			method : 'post',
			url    : 'update_credit_application',
		},
		{ manual: true },
	);

	const onCIDocSave = async (value) => {
		const invoice_document_details = {
			shipment_serial_id : invoiceData?.shipment_details?.shipment_serial_id,
			commercial_invoice : [
				{
					document_number : value?.ci_number,
					document_date   : value?.ci_date,
					invoice_amount  : {
						currency : value.invoice_amount.currency,
						amount   : parseFloat(value.invoice_amount.price, 10),
					},
					payment_terms        : value.payment_term,
					due_date             : value?.due_date,
					id                   : invoiceData?.id,
					prior_payment        : value?.prior_payment,
					document_type        : 'commercial_invoice',
					document_url         : value.commercial_invoice,
					document_extension   : getDocExtention(value.commercial_invoice),
					terms_and_conditions : TERMS_AND_CONDITIONS,
				},
			],
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
			// setAddBank(addBank === false);
			Toast.success('CI Details Saved');
			refetch();
		} catch (err) {
			console.log(err);
			Toast.error(err.data);
		}
	};
	return {
		onCIDocSave,
		loading,
	};
};

export default useSaveCiDocsDetails;
