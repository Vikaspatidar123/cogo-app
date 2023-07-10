import { Toast } from '@cogoport/components';
import { useState, useEffect } from 'react';

import { useRequest } from '@/packages/request';

const useFetchTrends = ({ pageLimit = 10 }) => {
	const [pagination, setPagination] = useState(1);

	const [{ loading:load, data: trendList }, trendTrigger] = useRequest({
		url    : '/list_freight_trend_subscriptions',
		method : 'get',
	}, { manual: true });

	const [{ loading:listloading }, trigger] = useRequest({
		url    : '/list_locations',
		method : 'get',
	}, { manual: true });

	const fetchTrends = () => {
		try {
			trendTrigger({
				params: {
					page       : pagination,
					page_limit : pageLimit,
				},
			});
		} catch (err) {
			console.log(err, 'errrr');
			Toast.error('Unable to fetch trend. Please try again.');
		}
	};
	const fetchLocations = async (inputValue, callback = () => {}) => {
		try {
			const res = await trigger({
				params: {
					filters: {
						status : 'active',
						q      : inputValue || undefined,
						type   : 'airport',
					},
					page_limit : 20,
					sort_by    : 'name',
					sort_type  : 'asc',
					includes   : { country: null, main_ports: null },
				},
			});

			let { data } = res;
			data = (data?.list || []).map((item) => ({
				label : item.display_name,
				value : item.id,
			}));

			callback(data);
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		fetchTrends();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pagination]);

	return {
		setPagination,
		fetchLocations,
		trendList,
		listloading,
		loading: load,
	};
};

export default useFetchTrends;
