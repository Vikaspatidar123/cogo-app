import { Toast } from '@cogoport/components';
import { useEffect, useCallback } from 'react';

import { useRequest } from '@/packages/request';

const useRecentSearches = () => {
	const [{ loading, data }, trigger] = useRequest({
		url: '/get_recommended_spot_searches',
		method: 'get',
	}, { manual: true });

	const fetchSearch = useCallback(() => {
		try {
			trigger({
				params: {},
			});
		} catch (error) {
			Toast.error(error?.message);
		}
	}, [trigger]);

	useEffect(() => {
		fetchSearch();
	}, [fetchSearch]);

	return {
		loading, data: data?.list || [],
	};
};

export default useRecentSearches;
