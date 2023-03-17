import { useEffect } from 'react';

import { useRequest } from '@/packages/request';
// import { useSelector } from '@/packages/store';

const useFetchAlerts = () => {
	const [{ loading }, trigger] = useRequest({
		url    : 'get_saas_container_alert',
		method : 'get',
	}, { manual: true });

	const fetchAlertDetails = async (saasTrackerId) => {
		try {
			// setLoadingAlertDetails(true);
			const res = await trigger({
				params: {
					saas_container_subscription_id: saasTrackerId,
				},
			});

			const { hasError } = res || {};
			if (hasError) throw new Error();

			const { data } = res;
			// setLoadingAlertDetails(false);
			return data;
		} catch (err) {
			// setLoadingAlertDetails(false);
			return false;
		}
	};
	useEffect(() => {
		fetchAlertDetails();
	}, []);

	return { loadingAlertDetails: loading, fetchAlertDetails };
};

export default useFetchAlerts;
