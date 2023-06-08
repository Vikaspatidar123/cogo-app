import { Toast } from '@cogoport/components';
import { useState, useEffect } from 'react';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const prepareFilters = () => {
	const finalFilters = {};

	return finalFilters;
};
const useFetchTrends = ({ pageLimit = 10 }) => {
	const [filters, setFilters] = useState({});
	const [pagination, setPagination] = useState(1);
	const { freightTrends, setFreightTrends } = useSelector((state) => state);

	const [{ loading:load, data: tredList = [] }, trendTrigger] = useRequest({
		url    : '/list_freight_trend_subscriptions',
		method : 'get',
	}, { manual: true });

	const [{ loading:listloading }, trigger] = useRequest({
		url    : '/list_locations',
		method : 'get',
	}, { manual: true });

	const fetchTrends = async () => {
		try {
			const res = await trendTrigger({
				params: {
					filters    : { ...prepareFilters(filters, freightTrends?.filter_data ?? {}) },
					page       : pagination,
					page_limit : pageLimit,
				},
			});
			const { hasError } = res || {};
			if (hasError) throw new Error();

			const { data } = res;
			if (data) {
				setFreightTrends(data);
			}
		} catch (err) {
			if (Object.keys(err).length > 1) { Toast.error('Unable to fetch trend. Please try again.'); }
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
			const { hasError } = res || {};
			if (hasError) throw new Error();

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
	}, [filters, pagination]);
	const refectTrends = () => fetchTrends(false);
	return {
		filters,
		setFilters,
		refectTrends,
		setPagination,
		fetchLocations,
		tredList,
		freightTrends,
		listloading,
		loading: load,
	};
};

export default useFetchTrends;
