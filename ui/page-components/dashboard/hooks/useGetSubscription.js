import { useState, useEffect } from 'react';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useGetSubscription = () => {
	const { profile } = useSelector((state) => state);

	const [subscriptionData, setSubscriptionData] = useState(null);

	const [{ loading }, trigger] = useRequest({
		method : 'get',
		url    : '/get_app_dashboard_subscription',
	}, { manual: true });

	const getSubscriptionData = async () => {
		const params = { organization_id: profile.organization.id };
		try {
			const res = await trigger({ params });
			if (!res.hasError) {
				setSubscriptionData(res.data);
			}
			return res;
		} catch (err) {
			return false;
		}
	};

	useEffect(() => {
		getSubscriptionData();
	}, []);

	return {
		subscriptionData,
		loading,
	};
};

export default useGetSubscription;
