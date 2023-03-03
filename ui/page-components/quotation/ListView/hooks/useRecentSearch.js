/* eslint-disable react-hooks/exhaustive-deps */
import { Toast } from '@cogoport/components';
import { useState, useEffect } from 'react';

import { useRequest } from '@/packages/request';

const useRecentSearch = () => {
	const [recentSearchData, setRecentSearchData] = useState();
	const [{ loading }, trigger] = useRequest({
		url    : 'get_recommended_spot_searches',
		method : 'get',
	}, { manual: true });

	const fetchSearch = async () => {
		try {
			const res = await trigger({
				params: {},
			});
			setRecentSearchData(
				(res?.data.list || []).filter((x) => x.search_type !== 'trailer_freight'),
			);
		} catch (error) {
			Toast.error(error?.message);
		}
	};

	useEffect(() => {
		fetchSearch();
	}, []);

	return {
		loading, recentSearchData,
	};
};

export default useRecentSearch;
