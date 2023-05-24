import { useState, useEffect } from 'react';

import { useRequest } from '@/packages/request';
import {
	setPastSearchesState,
	useSelector,
	useDispatch,
} from '@/packages/store';

const useRecommendedSearches = () => {
	const { list } = useSelector(
		({ search }) => ({
			list: search.past_searches || [],
		}),
	);
	const dispatch = useDispatch();
	const [pastSearchCount, setPastSearchCount] = useState({});
	// const [loading, setLoading] = useState(false);
	const [{ loading }, trigger] = useRequest({
		url    : '/get_recommended_spot_searches',
		method : 'get',
	}, { manual: true });
	const SetDateInStore = async () => {
		try {
			const resp = await trigger({});
			const { data = {} } = resp || {};
			if (!resp.hasError) {
				dispatch(
					setPastSearchesState({
						past_searches: data.list || [],
					}),
				);
				setPastSearchCount({
					count   : (data.list || []).length,
					loading : false,
				});
			} else {
				setPastSearchCount({ count: 0, loading: false });
			}
		} catch (err) {
			console.log(err, 'err');
		}
		// const resp = await trigger({});
		// const { data = {} } = resp || {};
		// if (!resp.hasError) {
		// 	dispatch(
		// 		setPastSearchesState({
		// 			past_searches: data.list || [],
		// 		}),
		// 	);
		// 	setPastSearchCount({
		// 		count   : (data.list || []).length,
		// 		loading : false,
		// 	});
		// } else {
		// 	setPastSearchCount({ count: 0, loading: false });
		// }
		// setLoading(false);
	};
	useEffect(() => {
		if ((list || []).length > 0) {
			return;
		}
		// setLoading(true);
		SetDateInStore();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return { loading, pastSearchCount };
};

export default useRecommendedSearches;
