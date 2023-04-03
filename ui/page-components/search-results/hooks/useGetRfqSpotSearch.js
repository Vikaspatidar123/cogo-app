import useGetInfiniteList from './useGetInfiniteList';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useGetRfqSpotSearches = (id, serialId) => {
	const { authorizationparameters } = useSelector(
		({ profile }) => ({
			authorizationparameters: profile?.authorizationparameters,
		}),
	);

	const [{ loading }, trigger] = useRequest(
		{
			url    : 'get_rfq_search',
			method : 'get',
		},
		{ manual: true },
	);

	const listAPi = (restFilters) => {
		const appliedFilters = {};
		Object.keys(restFilters).forEach((key) => {
			if (restFilters[key]) {
				appliedFilters[key] = restFilters[key];
			}
		});
		return trigger({
			params: {
				rfq_id    : id,
				serial_id : serialId,
				...(restFilters || {}),
			},
		});
	};

	const {
		filters,
		list: { fullResponse },
		hookSetters,
		refetch,
	} = useGetInfiniteList(listAPi, { id, authorizationparameters });

	return {
		loading,
		filters,
		list: { fullResponse },
		hookSetters,
		refetch,
	};
};
export default useGetRfqSpotSearches;
