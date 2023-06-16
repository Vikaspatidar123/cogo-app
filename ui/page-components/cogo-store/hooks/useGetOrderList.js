/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

import { useDebounceQuery } from '@/packages/forms';
import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useGetOrderList = () => {
	const { profile } = useSelector((state) => state);
	const { cogopoint_id } = profile || {};
	const [filters, setFilters] = useState({
		page: 1,
		search: '',
	});
	const { debounceQuery, query } = useDebounceQuery();
	const [{ loading, data }, trigger] = useRequest({
		url: '/list_cogostore_orders',
		method: 'get',
	}, { manual: true });

	const { page, search } = filters;

	const handlePageHandler = (val) => {
		setFilters((prev) => ({
			...prev,
			page: val,
		}));
	};

	const handleSearch = (val) => {
		setFilters((prev) => ({
			...prev,
			search: val,
		}));
	};

	const getOrderList = async () => {
		try {
			await trigger({
				params: {
					filters: {
						cogopoint_user_id: cogopoint_id,
						q: search,
					},
					service_object_required: true,
					user_type: 'user',
					page,
				},
			});
		} catch (err) {
			console.log(err, 'err');
		}
	};

	useEffect(() => {
		if (cogopoint_id) {
			getOrderList();
		}
	}, [cogopoint_id, page, query]);

	useEffect(() => {
		if (search !== undefined || search !== null) debounceQuery(search);
	}, [search]);

	return {
		data,
		loading,
		setFilters,
		searchValue: search,
		handlePageHandler,
		handleSearch,
	};
};

export default useGetOrderList;
