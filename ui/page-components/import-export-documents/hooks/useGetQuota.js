import { Toast } from '@cogoport/components';
import { useState, useEffect, useMemo } from 'react';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useGetQuota = () => {
	const { profile } = useSelector((state) => state);
	const { organization } = profile || {};

	const [subscriptionInfo, setSubscriptionInfo] = useState({});
	const {
		isUserSubscribed = false,
		isQuotaLeft = false,
		quotaValue = 0,
	} = subscriptionInfo;

	const [{ data }, trigger] = useRequest({
		method : 'get',
		url    : 'saas_get_user_quota_usage',
	}, { manual: true });

	const {
		is_free_plan = false,
		plan_details = [],
		priority_sequence: prioritySequence = 0,
	} = data || {};

	const getQuota = async () => {
		try {
			await trigger({
				params: { organization_id: organization?.id },
			});
		} catch (err) {
			Toast.error(err?.message);
		}
	};
	useEffect(() => {
		getQuota();
	}, []);

	useMemo(() => {
		if (data) {
			setSubscriptionInfo((prev) => ({
				...prev,
				isUserSubscribed: !is_free_plan,
			}));
			if (plan_details) {
				(plan_details || []).forEach(
					({
						product_name_slug = '',
						left_quota = 0,
						addon_quota = 0,
						is_unlimited = false,
					}) => {
						if (product_name_slug === 'premium_services') {
							const count = left_quota + addon_quota;
							const quotaLeft = count > 0;
							const quotaAvaliable = is_unlimited || quotaLeft;

							setSubscriptionInfo((prev) => ({
								...prev,
								isQuotaLeft : quotaAvaliable,
								quotaValue  : count,
							}));
						}
					},
				);
			}
		}
	}, [data]);

	return {
		data,
		isUserSubscribed,
		isQuotaLeft,
		quotaValue,
		prioritySequence,
		getQuota,
	};
};
export default useGetQuota;
