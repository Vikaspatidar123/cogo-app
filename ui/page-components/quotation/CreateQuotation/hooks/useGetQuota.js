/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useMemo } from 'react';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useGetQuota = () => {
	const { organization } = useSelector((state) => state.profile);

	const [isUserSubscribed, setIsUserSubscribed] = useState();
	const [isQuotaLeft, setIsQuotaLeft] = useState();
	const [quotaValue, setQuotaValue] = useState();

	const [{ loading, data }, trigger] = useRequest({
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
		} catch (error) {
			console.log(error);
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
						if (product_name_slug === 'quick_quotation') {
							const count = left_quota + addon_quota;
							const quotaAvaliable = is_unlimited || count > 0;
							setIsQuotaLeft(quotaAvaliable);
							setQuotaValue(count);
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
		loading,
	};
};

export default useGetQuota;
