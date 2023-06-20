import { useCallback, useEffect, useMemo, useState } from 'react';

import { useDebounceQuery } from '@/packages/forms';
import { useRouter } from '@/packages/next';
import { useRequest } from '@/packages/request';

const TRACKING_LIST_URL = {
	ocean : '/list_saas_container_subscriptions',
	air   : '/list_saas_air_subscriptions',
};

const STATS_KEY_MAPPING = {
	on_track_shipments : 'on_track_id',
	shipments_delayed  : 'shipments_delayed_id',
	attention_required : 'attention_required_id',
};

const useGetListTracker = () => {
	const { query: routerQuery } = useRouter();
	const { debounceQuery, query } = useDebounceQuery();

	const { branch_id, isArchived = false, trackingType = '', filters } = routerQuery || {};

	const [filter, setFilter] = useState({
		inputValue  : null,
		selectValue : filters,
	});
	const [globalFilter, setGlobalFilter] = useState({
		page        : 1,
		activeTab   : trackingType || 'ocean',
		q           : '',
		search_type : 'All',
	});
	const { inputValue } = filter;

	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : TRACKING_LIST_URL[globalFilter.activeTab],
	}, { manual: true });

	const stats = useMemo(() => data?.stats, [data]);

	const refetchTrackerList = useCallback(async () => {
		try {
			await trigger({
				params: {
					filters: {
						...globalFilter,
						status                 : isArchived ? 'completed' : 'active',
						organization_branch_id : branch_id,
					},
					page       : globalFilter.page,
					page_limit : 10,
				},
			});
		} catch (err) {
			console.log(err);
		}
	}, [globalFilter, branch_id, trigger, isArchived]);

	useEffect(() => {
		if (inputValue !== null && inputValue !== undefined) {
			debounceQuery(inputValue);
		}
	}, [debounceQuery, inputValue]);

	useEffect(() => {
		if (query !== null) {
			setGlobalFilter((prev) => ({
				...prev,
				q: query,
			}));
		}
	}, [query]);

	const filterChangeHandler = (name, value) => {
		setGlobalFilter((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	useEffect(() => {
		refetchTrackerList();
	}, [globalFilter, refetchTrackerList]);

	const selectValueChangeHandler = useCallback((value) => {
		const trackingId = stats?.[STATS_KEY_MAPPING[value]] || [];

		setFilter((prev) => ({ ...prev, selectValue: value }));
		setGlobalFilter((prev) => ({
			...prev,
			id: trackingId || '',
		}));
	}, [stats]);

	// useEffect(() => {
	// 	if (filters) {
	// 		selectValueChangeHandler(filters);
	// 	}
	// }, [filters, selectValueChangeHandler]);

	return {
		data,
		loading,
		refetchTrackerList,
		globalFilter,
		filter,
		setFilter,
		setGlobalFilter,
		filterChangeHandler,
		selectValueChangeHandler,
	};
};

export default useGetListTracker;
