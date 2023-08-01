import { useCallback, useEffect } from 'react';

import { useRequest } from '@/packages/request';

const useGetNPS = () => {
	const [{ loading, data }, trigger] = useRequest({
		method : 'get',
		url    : '/get_nps_status',
	}, { autoCancel: false, manual: true });

	const getScore = useCallback(() => {
		try {
			trigger();
		} catch (e) {
			console.error(e);
		}
	}, [trigger]);

	useEffect(() => {
		getScore();
	}, [getScore]);

	return { loading, data };
};

export default useGetNPS;
