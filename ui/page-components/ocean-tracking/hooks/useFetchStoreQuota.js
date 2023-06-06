import { useState, useEffect } from 'react';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useFetchStoreQuota = () => {
	const [storeQuota, setStoreQuota] = useState(null);
	const quota = storeQuota?.find((item) => item.product_name === 'Ocean Tracking');
	const { left_quota, addon_quota } = quota || {};
	const quotaCount = (left_quota + addon_quota) || 0;

	const { profile } = useSelector((s) => s);
	const [{ loading }, trigger] = useRequest({
		url    : '/saas_get_user_quota_usage',
		method : 'get',
	}, { manual: true });

	const fetchStoreQuota = async () => {
		try {
			const res = await trigger({
				params: { organization_id: profile.organization.id },
			});

			const { data } = res || {};

			setStoreQuota(data?.plan_details);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fetchStoreQuota();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {
		loading,
		storeQuota,
		fetchStoreQuota,
		quotaCount,
	};
};

export default useFetchStoreQuota;
