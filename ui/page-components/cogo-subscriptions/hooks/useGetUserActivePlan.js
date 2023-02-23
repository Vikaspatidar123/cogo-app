import { Toast } from '@cogoport/components';

import { useRequest } from '@/packages/request';

const useGetUSerActivePlan = ({ profile }) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/saas_get_user_active_plan',
		method : 'get',
	}, { manual: true });

	const getPlan = async ({ setUserPlan = () => {} }) => {
		try {
			const activePlanResponse = await trigger({
				params: {
					organization_id: profile?.organization?.id,
				},
			});
			setUserPlan(activePlanResponse?.data);
		} catch (error) {
			Toast.error(error?.message);
		}
	};
	return { getPlan, loading };
};

export default useGetUSerActivePlan;
