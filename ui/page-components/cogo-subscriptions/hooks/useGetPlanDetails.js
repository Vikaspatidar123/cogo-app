import { Toast } from '@cogoport/components';
import { useCallback } from 'react';

import { useRequest } from '@/packages/request';

const useGetPlanDetails = ({ profile }) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/saas_get_plan_details',
		method : 'get',
	}, { manual: true });

	const getPlan = useCallback(async ({
		setPlan,
		query,
		createCheckout,
		setCheckoutResponse,
		plan_pricing_id,
		addons = false,
	}) => {
		try {
			const resp = await trigger({
				params: {
					saas_plan_id    : query?.active || '',
					organization_id : profile?.organization?.id,
					plan_pricing_id,
				},
			});
			setPlan(resp?.data);

			if (resp.status === 200 && !addons) {
				createCheckout({
					setCheckoutResponse,
					query,
					resp: resp?.data,
					plan_pricing_id,
				});
			}
		} catch (error) {
			Toast.error(error?.message);
		}
	}, [profile?.organization?.id, trigger]);

	return { getPlan, planDataLoading: loading };
};
export default useGetPlanDetails;
