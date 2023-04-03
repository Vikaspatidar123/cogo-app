import { useEffect } from 'react';

import { useRequest } from '@/packages/request';

const useFetchAlerts = ({ setSubscriptionAlerts, setStep, setDeterminingStep }) => {
	const [{ loading }, trigger] = useRequest({
		url    : 'get_saas_container_alert',
		method : 'get',
	}, { manual: true });

	const fetchAlertDetails = async (saasTrackerId) => {
		try {
			const res = await trigger({
				params: {
					saas_container_subscription_id: saasTrackerId,
				},
			});

			const { hasError } = res || {};
			if (hasError) throw new Error();

			const { data } = res;
			console.log(data, 'data');
			if (data?.length > 0) {
				setSubscriptionAlerts(data);
				setStep(1);
			}
			setDeterminingStep(false);
			return data;
		} catch (err) {
			return false;
		}
	};
	useEffect(() => {
		fetchAlertDetails();
	}, []);

	return { loading, fetchAlertDetails };
};

export default useFetchAlerts;
