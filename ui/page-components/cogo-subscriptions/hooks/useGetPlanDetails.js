import { Toast } from '@cogoport/components';

import { useRequest } from '@/packages/request';

const useGetPlanDetails = ({ profile }) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/saas_get_plan_details',
		method : 'get',
	}, { manual: true });

	const getPlan = async ({
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

			if (resp?.hasError === false && !addons) {
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
	};
	return { getPlan, planDataLoading: loading };
};
export default useGetPlanDetails;
