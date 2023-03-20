import { Toast } from '@cogoport/components';
import { useEffect } from 'react';

import { useRequest, useCallback } from '@/packages/request';

const useFetchAlerts = () => {
	const [{ loading }, trigger] = useRequest({
		url    : 'get_saas_container_alert',
		method : 'get',
	}, { manual: true });

	const fetchAlertDetails = useCallback(async (saasTrackerId) => {
		try {
			const res = await trigger({
				params: {
					saas_container_subscription_id: saasTrackerId,
				},
			});

			const { hasError } = res || {};
			if (hasError) throw new Error();

			const { data } = res;
			return data;
		} catch (err) {
			Toast.error(err?.message);
			return false;
		}
	}, [trigger]);
	useEffect(() => {
		fetchAlertDetails();
	}, [fetchAlertDetails]);

	return { loadingAlertDetails: loading, fetchAlertDetails };
};

export default useFetchAlerts;
