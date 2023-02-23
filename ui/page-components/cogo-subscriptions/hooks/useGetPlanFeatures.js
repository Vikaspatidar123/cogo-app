import { useRequest } from '@/packages/request';

const useGetPlanFeatures = () => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/saas_get_plan_features',
		method : 'get',
	}, { manual: true });

	const refetchPlanFeatures = async ({ saas_product_family_id = '' }) => {
		try {
			await trigger({
				params: {
					saas_product_family_id:
						saas_product_family_id || '906a632c-604f-4a1f-83b1-c9ddea85e224',
				},
			});
		} catch (err) {
			console.log(err);
		}
	};

	return {
		refetchPlanFeatures,
		planFeatureLoading : loading,
		planFeatureData    : data,
	};
};
export default useGetPlanFeatures;
