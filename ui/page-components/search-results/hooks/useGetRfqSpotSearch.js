import { useRequest } from '@cogo/commons/hooks';
import useGetInfiniteList from '@cogo/commons/hooks/useGetInfiniteList';
import { useSelector } from '@cogo/store';

const useGetRfqSpotSearches = (id, serialId) => {
	const { scope, authorizationparameters } = useSelector(
		({ general, profile }) => ({
			scope                   : general.scope,
			authorizationparameters : profile?.authorizationparameters,
		}),
	);

	const { trigger } = useRequest('get', false, scope)('/get_rfq_search');

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
		loading,
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
