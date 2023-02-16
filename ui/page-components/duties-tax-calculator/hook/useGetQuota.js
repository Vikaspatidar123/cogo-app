import toast from '@cogoport/components';
import { useState, useEffect, useMemo } from 'react';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useGetQuota = () => {
	const [isUserSubscribed, setIsUserSubscribed] = useState();
	const [isQuotaLeft, setIsQuotaLeft] = useState();
	const [quotaValue, setQuotaValue] = useState();

	const { profile = {}, general } = useSelector((s) => s);
	const { organization } = profile || {};
	const { scope } = general;
	const { data, trigger } = useRequest('get', true, scope)('saas_get_user_quota_usage');
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
	}, [data]);

	return {
		isUserSubscribed,
		isQuotaLeft,
		quotaValue,
		prioritySequence,
		getQuota,
	};
};
export default useGetQuota;
