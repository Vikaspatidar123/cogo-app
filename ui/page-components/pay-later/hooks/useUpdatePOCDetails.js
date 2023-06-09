import { useRequest } from '@/packages/request';

const useUpdatePOCDetails = () => {
	const [{ data, loading }, trigger] = useRequest(
		{
			method : 'post',
			url    : 'update_organization_credit_request_poc_details',
		},
		{ manual: true },
	);

	const updatePOCDetails = async ({ poc = '', pocDetails = '' }) => {
		try {
			await trigger({
				data: {
					poc_details: {
						...pocDetails[poc],
						work_scope: poc,
					},
				},
			});
		} catch (e) {
			console.log(e, 'error');
		}
	};

	return { updatePOCDetails, loading, data };
};

export default useUpdatePOCDetails;
