import { useCallback, useEffect, useState } from 'react';

import { useDebounceQuery } from '@/packages/forms';
import { useRouter } from '@/packages/next';
import { useRequest } from '@/packages/request';

const useGetListTracker = () => {
	const { query: routerQuery } = useRouter();
	const { debounceQuery, query } = useDebounceQuery();

	const [globalFilter, setGlobalFilter] = useState({
		page        : 1,
		activeTab   : 'all',
		selectValue : '',
		query       : '',
	});
	const [inputValue, setInputValue] = useState();

	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/list_saas_container_subscriptions',
	}, { manual: true });

	const refetchTrackerList = useCallback(async () => {
		try {
			await trigger({
				params: {
					filters: {
						organization_branch_id : routerQuery?.branch_id,
						// ...prepareFilters(filters, trackers?.filter_data ?? {}),
						...globalFilter,
						status                 : 'active',
					},
					page       : globalFilter.page,
					page_limit : 10,
				},
			});
		} catch (err) {
			console.log(err);
		}
	}, [globalFilter, routerQuery, trigger]);

	useEffect(() => {
		if (inputValue !== null && inputValue !== undefined) {
			debounceQuery(inputValue);
		}
	}, [debounceQuery, inputValue]);

	useEffect(() => {
		if (query !== null) {
			setGlobalFilter((prev) => ({
				...prev,
				query,
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
