import { useCallback, useEffect, useState } from 'react';

import { useRequest } from '@/packages/request';

const NULL_ITEM = [-1, null];

const useGetCsatScore = ({ serviceName = '' }) => {
	const [showRateUs, setShowRateUs] = useState(false);

	const [{ data, loading }, trigger] = useRequest({
		url    : '/get_csat_status',
		method : 'get',
	}, { autoCancel: false, manual: true });

	const getCsatScore = useCallback(async () => {
		try {
			const resp = await trigger({
				params: {
					service_name: serviceName,
				},
			});
			setShowRateUs(NULL_ITEM.includes(resp?.data?.achieved_rating));
		} catch (e) {
			console.error(e);
		}
	}, [serviceName, trigger]);

	useEffect(() => {
		getCsatScore();
	}, [getCsatScore]);

	return { data, loading, showRateUs, setShowRateUs };
};

export default useGetCsatScore;
