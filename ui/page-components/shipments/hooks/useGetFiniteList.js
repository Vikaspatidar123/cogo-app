import { useState, useEffect } from 'react';

const useGetFiniteList = (hook, params = {}) => {
	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(true);
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
			return data?.list || [];
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
		setLoading(true);
		refetch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
