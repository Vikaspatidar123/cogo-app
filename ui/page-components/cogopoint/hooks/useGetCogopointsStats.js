import { useEffect, useCallback } from 'react';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useGetCogopointsStats = () => {
	const { profile } = useSelector((state) => state);
	const [{ loading, data }, trigger] = useRequest({
		url    : '/get_cogopoint_user_profile',
		method : 'get',
	}, { manual: true });

	const getStats = useCallback(() => {
		try {
			trigger({
				params: { user_id: profile?.user?.id },
			});
		} catch (e) {
			console.log(e);
		}
	}, [profile?.user?.id, trigger]);

	useEffect(() => {
		getStats();
	}, [getStats]);

	return {
		loading,
		stats: data,
		getStats,
	};
};

export default useGetCogopointsStats;
