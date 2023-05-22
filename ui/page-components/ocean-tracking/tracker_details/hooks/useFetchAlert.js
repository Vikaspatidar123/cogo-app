import { useCallback } from 'react';

import { useRequest } from '@/packages/request';

const useFetchAlerts = ({ setSubscriptionAlerts, setStep, setDeterminingStep }) => {
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
			if (data?.length > 0) {
				setSubscriptionAlerts(data);
				setStep(1);
			}
			setDeterminingStep(false);
			return data;
		} catch (err) {
			return false;
		}
	}, [setDeterminingStep, setStep, setSubscriptionAlerts, trigger]);

	return { loading, fetchAlertDetails };
};

export default useFetchAlerts;
