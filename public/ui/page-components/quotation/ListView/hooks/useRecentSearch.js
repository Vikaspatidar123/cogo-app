import { useState, useEffect, useCallback } from 'react';

import { useRequest } from '@/packages/request';

const useRecentSearch = () => {
	const [recentSearchData, setRecentSearchData] = useState();
	const [{ loading }, trigger] = useRequest({
		url    : 'get_recommended_spot_searches',
		method : 'get',
	}, { manual: true });

	const fetchSearch = useCallback(async () => {
		try {
			const res = await trigger({
				params: {},
			});
			setRecentSearchData(
				(res?.data.list || []).filter((x) => x.search_type !== 'trailer_freight'),
			);
		} catch (error) {
			console.log(error);
		}
	}, [trigger]);

	useEffect(() => {
		fetchSearch();
	}, [fetchSearch]);

	return {
		loading, recentSearchData,
	};
};

export default useRecentSearch;
