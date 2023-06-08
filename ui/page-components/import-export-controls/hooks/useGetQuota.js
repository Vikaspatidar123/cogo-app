import { Toast } from '@cogoport/components';
import { useState, useEffect, useMemo } from 'react';

import { useRequestBf } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useGetQuota = () => {
	const { profile } = useSelector((s) => s);
	const { organization } = profile || {};

	const [subscriptionInfo, setSubscriptionInfo] = useState({});
	const {
		isUserSubscribed = false,
		isQuotaLeft = false,
		quotaValue = 0,
	} = subscriptionInfo;

	const [{ data }, trigger] = useRequestBf({
		method : 'get',
		url    : '/saas_get_user_quota_usage',
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
				const planDetails = plan_details.find(
					(details) => details?.product_name_slug === 'premium_services',
				);
				const {
					left_quota = 0,
					addon_quota = 0,
					is_unlimited = false,
				} = planDetails || {};

				const count = +left_quota + +addon_quota;
				const quotaLeft = count > 0;
				const quotaAvaliable = is_unlimited || quotaLeft;

				setSubscriptionInfo((prev) => ({
					...prev,
					isQuotaLeft : quotaAvaliable,
					quotaValue  : count,
				}));
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
