import { Toast } from '@cogoport/components';

import { useRequest } from '@/packages/request';

const useGetAllPlans = ({ profile }) => {
	const [{ loading }, trigger] = useRequest(
		{
			url    : '/saas_get_dashboard',
			method : 'get',
		},
		{ manual: true },
	);
	const getPlansFunction = async ({ setAllPlans }) => {
		try {
			const response = await trigger({
				params: {
					organization_id: profile?.organization?.id,
				},
			});
			setAllPlans(response?.data);
		} catch (error) {
			Toast.error(error?.message);
		}
	};
	return { getPlansFunction, plansLoading: loading };
};

export default useGetAllPlans;
