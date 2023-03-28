// import { getRequest } from '@cogo/app-common';
import { Toast } from '@cogoport/components';
import { useState, useEffect } from 'react';

const useList = (endpoint, scope = 'app') => (params = {}) => getRequest(scope).get(endpoint, { params });

const PAGE_LIMIT = 10;

const getList = (hook, defaultFilters) => {
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(true);
	const [list, setList] = useState({
		data        : [],
		hasMore     : true,
		total_count : null,
	});

	const getData = () => {
		const { globalParams } = defaultFilters || {};

		hook({
			page,
			page_limit               : 20,
			...(globalParams || {}),
			pagination_data_required : true,
		})
			.then((res) => {
				const { data, messages } = res;
				if (res.hasError) {
					Toast.error(messages);
				} else {
					setList({
						data:
							page === 1
								? [...(data?.list || [])]
								: [...(list.data || []), ...(data?.list || [])],
						hasMore     : (data?.list || []).length > PAGE_LIMIT,
						total_count : data?.total_count,
					});
				}
			})
			.catch((e) => {
				Toast.error('Something went wrong, we are working on it!');
			})
			.then(() => {
				setLoading(false);
			});
	};

	useEffect(() => {
		setLoading(true);
		getData();
	}, [page]);

	const hookSetters = {
		setPage,
		setLoading,
		setList,
	};

	return { loading, list, hookSetters, page };
};

export { getList, useList };
