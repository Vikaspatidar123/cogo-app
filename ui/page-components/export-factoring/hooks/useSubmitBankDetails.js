import { Toast } from '@cogoport/components';

import { useRequest } from '@/packages/request';

const getDocExtention = (url) => url.split('.').pop();

const useSubmitBankDetails = ({
	accountType,
}
	// {
	// creditRequest = {},
	// setCreditRequest = () => {},
	// addBank,
	// setAddBank,
	// bank = {},
// }
) => {
	const [{ data, loading }, trigger] = useRequest(
		{
			method : 'post',
			url    : 'update_credit_application',
		},
		{ manual: true },
	);

	const onSubmit = async (values) => {
		const ef_bank_details = {
			account_type             : accountType,
			aba_routing_number       : values?.aba_routing_number,
			beneficiary_name         : values?.account_holder_name,
			account_number           : values?.account_number,
			bank_name                : values?.bank_name,
			swift_code               : values?.swift_code,
			ifsc_number              : values?.ifsc_number,
			corresponding_bank_name  : values?.corresponding_bank_name,
			corresponding_swift_code : values?.corresponding_swift_code,
			// exporter_bank_account_id : bank?.exporter_bank_account_id,
			documents                : [
				{
					document_extension : getDocExtention(values?.letter_head || ''),
					document_type      : 'letter_head',
					document_url       : values?.letter_head,
				},
			],
		};

		if (accountType === 'eefc_account') {
			ef_bank_details.currency = values?.currency;
		} else {
			ef_bank_details.documents.push({
				document_extension : getDocExtention(values?.exporter_cheque || ''),
				document_type      : 'cancelled_cheque',
				document_url       : values?.exporter_cheque,
			});
		}

		try {
			const payload = {
				export_factoring_service_attributes: {
					ef_bank_details,
					section_to_update: 'ef_bank_details',
				},
				// credit_id: creditRequest?.credit_id,
				// credit_id: '133f5ab9-fc18-4d5b-8a9e-6ee3f0fd30c1',
				credit_id: 'e7bb79a0-6534-41f7-95e9-cbbd98044043',
			};
			await trigger({
				data: payload,
			});
			// setCreditRequest(data?.creditRequest);
			// setAddBank(addBank === false);
			Toast.success('Bank Details Saved');
		} catch (err) {
			Toast.error(err.data);
		}
	};
	return {
		onSubmit,
		loading,
	};
};

export default useSubmitBankDetails;
