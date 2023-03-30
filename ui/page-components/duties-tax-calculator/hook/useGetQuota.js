import { Toast } from '@cogoport/components';
import { useState, useEffect, useMemo, useCallback } from 'react';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useGetQuota = () => {
	const [isUserSubscribed, setIsUserSubscribed] = useState();
	const [isQuotaLeft, setIsQuotaLeft] = useState();
	const [quotaValue, setQuotaValue] = useState();

	const { profile = {} } = useSelector((s) => s);
	const { organization } = profile || {};

	const [{ data }, trigger] = useRequest({
		url    : '/saas_get_user_quota_usage',
		method : 'get',
	}, { manual: true });
	const {
		is_free_plan = false,
		plan_details = [],
		priority_sequence: prioritySequence = 0,
	} = data || {};

	const getQuota = useCallback(async () => {
		try {
			await trigger({
				params: { organization_id: organization?.id },
			});
		} catch (err) {
			Toast.error(err?.message);
		}
	}, [organization?.id, trigger]);
	useEffect(() => {
		getQuota();
	}, [getQuota]);

	useMemo(() => {
		if (data) {
			setIsUserSubscribed(!is_free_plan);
			if (plan_details) {
				(plan_details || []).forEach(
					({
						product_name_slug = '',
						left_quota = 0,
						addon_quota = 0,
						is_unlimited = false,
					}) => {
						if (product_name_slug === 'premium_services') {
							const count = left_quota + addon_quota > 0;
							const quotaAvaliable = is_unlimited || count;
							setIsQuotaLeft(quotaAvaliable);
							setQuotaValue(+left_quota + +addon_quota);
						}
					},
				);
			}
		}
	}, [data, is_free_plan, plan_details]);

	return {
		isUserSubscribed,
		isQuotaLeft,
		quotaValue,
		prioritySequence,
		getQuota,
	};
};
export default useGetQuota;
