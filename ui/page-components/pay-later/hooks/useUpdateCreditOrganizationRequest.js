import { useRequest } from '@/packages/request';

const useUpdateCreditOrganizationRequest = () => {
	const [{ data, loading }, trigger] = useRequest({
		method : 'post',
		url    : '/update_organization_credit_request',
	}, { autoCancel: false });

	const updateRequest = async () => {
		try {
			await trigger({
				data: {},
			});
		} catch (e) {
			console.log(e);
		}
	};

	return { updateRequest, data, loading };
};

export default useUpdateCreditOrganizationRequest;
