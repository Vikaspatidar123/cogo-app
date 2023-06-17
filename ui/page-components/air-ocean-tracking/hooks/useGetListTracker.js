import { useCallback, useEffect, useState } from 'react';

import { useDebounceQuery } from '@/packages/forms';
import { useRouter } from '@/packages/next';
import { useRequest } from '@/packages/request';

const TRACKING_LIST_URL = {
	ocean : '/list_saas_container_subscriptions',
	air   : '/list_saas_air_subscriptions',
};

const useGetListTracker = () => {
	const { query: routerQuery } = useRouter();
	const { debounceQuery, query } = useDebounceQuery();

	const { branch_id, isArchived = false, trackingType = '' } = routerQuery || {};

	const [globalFilter, setGlobalFilter] = useState({
		page        : 1,
		selectValue : '',
		activeTab   : trackingType || 'ocean',
		q           : '',
	});
	const [inputValue, setInputValue] = useState();

	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : TRACKING_LIST_URL[globalFilter.activeTab],
	}, { manual: true });

	const refetchTrackerList = useCallback(async () => {
		try {
			await trigger({
				params: {
					filters: {
						organization_branch_id : branch_id,
						// ...prepareFilters(filters, trackers?.filter_data ?? {}),
						...globalFilter,
						status                 : isArchived ? 'completed' : 'active',
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

	return {
		data,
		loading,
		refetchTrackerList,
		globalFilter,
		setGlobalFilter,
		inputValue,
		setInputValue,
		filterChangeHandler,
	};
};

export default useGetListTracker;
