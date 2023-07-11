import { Toast } from '@cogoport/components';
import { useCallback, useEffect, useState } from 'react';

import { MIN_POPPULAR_SEQUENCE } from '../constants/dimensions';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useGetUSerActivePlan = () => {
	const { profile } = useSelector((s) => s);
	const [userplan, setUserPlan] = useState({});

	const [subscribeTab, setSubscribeTab] = useState('monthly');

	const [activeTab, setActiveTab] = useState('monthly');
	const { item_plans = [] } = userplan || {};

	const checkPlanType = item_plans.some(
		({ display_pricing = {}, priority_sequence }) => !!(
			priority_sequence > MIN_POPPULAR_SEQUENCE
			&& display_pricing?.annual?.is_active_plan
		),
	);
	const [{ loading, data: plansData }, trigger] = useRequest({
		url: '/saas_get_user_active_plan',
		method: 'get',
	}, { manual: true });
	const getPlan = useCallback(async () => {
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
	}, [profile?.organization?.id, trigger]);

	useEffect(() => {
		if (Object.keys(item_plans).length > 0) {
			if (checkPlanType) {
				setActiveTab('annual');
				setSubscribeTab('annual');
			}
		}
	}, [checkPlanType, item_plans]);

	useEffect(() => {
		getPlan();
	}, [getPlan]);

	return {
		getPlan,
		plansData,
		loading,
		setUserPlan,
		userplan,
		setActiveTab,
		activeTab,
		setSubscribeTab,
		subscribeTab,
	};
};

export default useGetUSerActivePlan;
