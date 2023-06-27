import { Toast } from '@cogoport/components';

import { useRequest } from '@/packages/request';

const useSubmitBuyerDetails = (
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
			url    : 'create_export_factoring_buyer_details',
		},
		{ manual: true },
	);

	const onSubmit = async (values) => {
		console.log(values, 'kkkkk');

		try {
			const payload = {
				export_factoring_service_attributes: {
					// ef_bank_details,
				},
				// credit_id: creditRequest?.credit_id,
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

export default useSubmitBuyerDetails;
