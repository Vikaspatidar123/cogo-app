import { debounce } from '@cogoport/utils';
import { useCallback, useEffect, useState } from 'react';

import { useRequest } from '@/packages/request';

const useGetRfqList = ({ activeFilter }) => {
	const useSearchQuery = () => {
		const [query, setQuery] = useState();

		const request = debounce((val) => {
			setQuery(val);
		}, 600);

		const debounceQuery = useCallback((val) => request(val), [request]);
		return { debounceQuery, query };
	};
	const { debounceQuery, query } = useSearchQuery();

	const [pagination, setPagination] = useState(1);

	const [{ data, loading }, trigger] = useRequest(
		{
			method : 'get',
			url    : '/list_rfqs',
		},
		{ manual: true },
	);

	const getRfqList = useCallback(async () => {
		try {
			const StatusMapping = {
				all        : undefined,
				live       : ['live'],
				requested  : ['uploaded'],
				draft      : ['draft'],
				is_expired : ['is_expired'],
			};
			await trigger({
				params: {
					page                     : pagination,
					list_count_data_required : true,
					port_pair_data_required  : true,
					filters                  : {
						status    : StatusMapping[activeFilter],
						serial_id : query || undefined,
					},
				},
			});
		} catch (error) {
			console.log(error);
		}
	}, [query, activeFilter, pagination, trigger]);

	useEffect(() => {
		getRfqList();
	}, [activeFilter, pagination, query, getRfqList]);

	const { list, stats, ...pageData } = data || {};

	return {
		loading,
		data,
		rfqList: list,
		stats,
		pageData,
		pagination,
		setPagination,
		getRfqList,
		debounceQuery,
	};
};

export default useGetRfqList;
