import { Toast } from '@cogoport/components';
import { useState, useEffect } from 'react';

// import { prepareFilters } from '../common/utils';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useFetchTrends = ({ pageLimit = 10 }) => {
	const [filters, setFilters] = useState({});
	const [loading, setLoading] = useState(false);
	const [pagination, setPagination] = useState({ page: 1 });
	const { freightTrends, setFreightTrends } = useSelector((state) => state);

	const [{ loading:load, data: tredList }, trendTrigger] = useRequest({
		url    : '/list_freight_trend_subscriptions',
		method : 'get',
	}, { manual: true });

	const [{ loading:listloading }, trigger] = useRequest({
		url    : '/list_locations',
		method : 'get',
	}, { manual: true });

	const prepareFilters = () => {
		const finalFilters = {};

		return finalFilters;
	};
	const fetchTrends = async (showLoading = true) => {
		try {
			if (showLoading) setLoading(true);
			const res = await trigger({
				params: {
					filters    : { ...prepareFilters(filters, freightTrends?.filter_data ?? {}) },
					page       : pagination.page,
					page_limit : pageLimit,
				},
			});
			if (showLoading) setLoading(false);
			const { hasError } = res || {};
			if (hasError) throw new Error();

			const { data } = res;
			setFreightTrends(data);
		} catch (err) {
			console.log(err, 'error');
			if (Object.keys(err).length > 1) { Toast.error('Unable to fetch trend. Please try again.'); }
			if (showLoading) setLoading(false);
		}
	};
	const fetchLocations = async (inputValue, callback) => {
		try {
			const res = await trendTrigger({
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
			Toast.error("Couldn't fetch locations. Please try again later.");
		}
	};

	const refectTrends = () => fetchTrends(false);
	useEffect(() => { fetchLocations(); }, []);

	return {
		loading,
		filters,
		setLoading,
		setFilters,
		refectTrends,
		setPagination,
		fetchLocations,
		tredList,
	};
};

export default useFetchTrends;
