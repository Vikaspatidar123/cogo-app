import { useCallback, useEffect, useState } from 'react';

import { useRequest } from '@/packages/request';

const useGetCsatScore = ({ serviceName = '' }) => {
	const [showRateUs, setShowRateUs] = useState(false);

	const [{ data, loading }, trigger] = useRequest({
		url    : '/get_csat_status',
		method : 'get',
	}, { autoCancel: false, manual: true });

	const getCsatScore = useCallback(async () => {
		try {
			await trigger({
				params: {
					service_name: serviceName,
				},
			});
			setShowRateUs([-1, null].includes(data?.achieved_rating));
		} catch (e) {
			console.error(e);
		}
	}, [data?.achieved_rating, serviceName, trigger]);

	useEffect(() => {
		getCsatScore();
	}, [getCsatScore]);

	return { data, loading, showRateUs, setShowRateUs };
};

export default useGetCsatScore;
