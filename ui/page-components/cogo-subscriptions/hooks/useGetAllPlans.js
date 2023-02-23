import { useRequest, useScope } from '@cogo/commons/hooks';
import toast from '@cogoport/front/components/admin/Toast';

const useGetAllPlans = ({ profile }) => {
	const { scope } = useScope();
	const { trigger, loading } = useRequest('get', false, scope)('/saas_get_dashboard');
	const getPlansFunction = async ({ setAllPlans }) => {
		try {
			const response = await trigger({
				params: {
					organization_id: profile?.organization?.id,
				},
			});
			setAllPlans(response?.data);
		} catch (error) {
			toast.error(error?.message);
		}
	};
	return { getPlansFunction, plansLoading: loading };
};

export default useGetAllPlans;
