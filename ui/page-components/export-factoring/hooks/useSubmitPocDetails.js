import { Toast } from '@cogoport/components';

import { useRequest } from '@/packages/request';

const useSubmitPocDetails = ({
	buyers,
	setOpenAddPoc,
	getCreditRequestResponse,
}) => {
	const [{ data, loading }, trigger] = useRequest(
		{
			method : 'post',
			url    : 'add_buyer_poc',
		},
		{ manual: true },
	);

	const onSubmit = async (value) => {
		const values = {
			poc_details : { ...value },
			buyer_id    : buyers?.id,
		};

		try {
			const payload = {
				export_factoring_service_attributes: {
					...values,
				},
				// credit_id: getCreditRequestResponse?.credit_id,
				credit_id: 'e7bb79a0-6534-41f7-95e9-cbbd98044043',
			};
			await trigger({
				data: payload,
			});
			// setCreditRequest(data?.creditRequest);
			setOpenAddPoc(false);
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

export default useSubmitPocDetails;
