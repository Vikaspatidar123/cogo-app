import { useCallback, useEffect } from 'react';

import { useRequest } from '@/packages/request';

const useGetPlanFeatures = ({ saas_product_family_id = '' }) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/saas_get_plan_features',
		method : 'get',
	}, { manual: true });

	const refetchPlanFeatures = useCallback(async () => {
		try {
			await trigger({
				params: {
					saas_product_family_id,
				},
			});
		} catch (err) {
			console.error(err);
		}
	}, [saas_product_family_id, trigger]);

	useEffect(() => {
		if (saas_product_family_id) refetchPlanFeatures();
	}, [refetchPlanFeatures, saas_product_family_id]);

	return {
		refetchPlanFeatures,
		planFeatureLoading : loading,
		planFeatureData    : data,
	};
};
export default useGetPlanFeatures;
