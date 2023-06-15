import { useRequest } from '@/packages/request';

const useUpdateOrganizationCreditApplication = ({ refetch = () => {} }) => {
	const [{ loading, data }, trigger] = useRequest(
		{
			method : 'post',
			url    : 'update_organization_credit_application',
		},
		{ manual: true },
	);

	const updateOrganizationCreditApplication = async () => {
		try {
			await trigger({
				data: {},
			});
			refetch();
		} catch (e) {
			console.log(e);
		}
	};

	return { updateOrganizationCreditApplication, loading, data };
};

export default useUpdateOrganizationCreditApplication;
