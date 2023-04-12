import { useState, useEffect } from 'react';

import { useSelector } from '@/packages/store';

const useGetFiniteList = (hook, params = {}) => {
	const { pathname } = useSelector(({ general, profile }) => ({
		...general,
		user_profile: profile,
	}));
	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(true);
	const [initialPath] = useState(pathname);
	const [filters, setFilters] = useState({ page: 1, highlight: undefined });
	const [list, setList] = useState({
		data         : [],
		total        : 0,
		total_page   : 0,
		fullResponse : {},
		reverted     : 0,
	});

	const { page, highlight = false, ...restFilters } = filters;

	const refetch = async () => {
		setLoading(true);
		try {
			const res = await hook(restFilters, page);

			const { data = { list: [], total: 0 } } = res;
			setList(() => ({
				data         : data?.list || [],
				total        : data?.total_count,
				total_page   : data?.total,
				fullResponse : res.data,
				reverted     : data?.stats?.reverted,
			}));
			setLoading(false);
		} catch (err) {
			if (err.constructor.name === 'Cancel') return null;
			setList(() => ({
				data         : [],
				total        : 0,
				total_page   : 0,
				fullResponse : {},
				reverted     : 0,
			}));
			setLoading(false);
			return null;
		}
	};
	useEffect(() => {
		if (initialPath === pathname) {
			setLoading(true);
			refetch();
		}
	}, [filters, JSON.stringify(params)]);

	const hookSetters = {
		setLoading,
		setFilters,
		setErrors,
		setList,
	};

	return {
		loading,
		page,
		filters: restFilters,
		list,
		errors,
		hookSetters,
		refetch,
		highlight,
	};
};

export default useGetFiniteList;
