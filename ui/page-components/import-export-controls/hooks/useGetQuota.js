import { useState, useEffect, useMemo } from 'react';
import { useRequest } from '@cogo/commons/hooks';
import toast from '@cogoport/front/components/admin/Toast';
import { useSaasState } from '../../../common/context';

const useGetQuota = () => {
	const { profile, general } = useSaasState();
	const { organization } = profile || {};
	const { scope } = general;

	const [subscriptionInfo, setSubscriptionInfo] = useState({});
	const {
		isUserSubscribed = false,
		isQuotaLeft = false,
		quotaValue = 0,
	} = subscriptionInfo;

	const { data, trigger } = useRequest(
		'get',
		true,
		scope,
	)('/saas_get_user_quota_usage');

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
			toast.error(err?.message);
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
					isQuotaLeft: quotaAvaliable,
					quotaValue: count,
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
