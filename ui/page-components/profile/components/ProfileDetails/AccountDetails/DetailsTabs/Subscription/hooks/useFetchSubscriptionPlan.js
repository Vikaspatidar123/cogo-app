import { useCallback, useEffect } from 'react';

import { useRouter } from '@/packages/next';
import { useRequest } from '@/packages/request';

const useFetchSubscriptionPlan = () => {
	const { query = {} } = useRouter();

	const { module = '' } = query || {};

	const [{ data, loading }, trigger] = useRequest(
		{
			url    : '/saas_get_user_active_plan',
			method : 'get',
		},
	);

	const fetchSubscription = useCallback(() => {
		try {
			trigger();
		} catch (err) {
			console.error(err);
		}
	}, [trigger]);

	useEffect(() => {
		if (module === 'subscription') {
			fetchSubscription();
		}
	}, [fetchSubscription, module]);

	return { data, loading };
};

export default useFetchSubscriptionPlan;
