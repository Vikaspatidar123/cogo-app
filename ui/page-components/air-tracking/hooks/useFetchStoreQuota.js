import { useState, useEffect, useCallback } from 'react';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useFetchStoreQuota = () => {
	const [storeQuota, setStoreQuota] = useState(null);
	const quota = storeQuota?.find((item) => item.product_name === 'Air Tracking');
	const left_quota = quota?.left_quota;
	const add_quota = quota?.addon_quota;
	const quotaCount = left_quota + add_quota || 0;

	const { profile } = useSelector((s) => s);
	const [{ loading }, trigger] = useRequest({
		url    : '/saas_get_user_quota_usage',
		method : 'get',
	}, { manual: true });

	const fetchStoreQuota = useCallback(async () => {
		try {
			const res = await trigger({
				params: { organization_id: profile.organization.id },
			});

			const { data } = res || {};

			setStoreQuota(data?.plan_details);
		} catch (err) {
			console.log(err);
		}
	}, [profile.organization.id, trigger]);

	useEffect(() => {
		fetchStoreQuota();
	}, [fetchStoreQuota]);

	return {
		loading,
		storeQuota,
		fetchStoreQuota,
		quotaCount,
	};
};

export default useFetchStoreQuota;
