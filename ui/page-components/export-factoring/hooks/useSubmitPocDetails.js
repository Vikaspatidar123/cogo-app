import { Toast } from '@cogoport/components';

import { useRequest } from '@/packages/request';

const useSubmitPocDetails = ({
	buyers,
	refetch,
	setOpenAddPoc,
	getCreditRequestResponse,
}) => {
	const [{ loading }, trigger] = useRequest(
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
				credit_id: getCreditRequestResponse?.credit_id,
			};
			await trigger({
				data: payload,
			});
			refetch();
			setOpenAddPoc(false);
			Toast.success('Poc Details Saved');
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
