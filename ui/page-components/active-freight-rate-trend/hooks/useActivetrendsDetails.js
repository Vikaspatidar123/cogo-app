import { Toast } from '@cogoport/components';
import { useState, useEffect } from 'react';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useFetchActiveTrend = () => {
	const [activefilters, setActiveFilters] = useState({});

	const [activePagination, setActivePagination] = useState({ page: 1 });
	const { trackers, setTrackers } = useSelector((state) => state);

	const [{ loading }, freckTrackerTrigger] = useRequest({
		url    : '/list_freight_trend_rates',
		method : 'get',
	}, { manual: true });

	const fetchTrackers = async () => {
		try {
			const { currency, commodity, ...rest } = activefilters;

			const res = await freckTrackerTrigger({
				params: {
					currency : currency || 'USD',
					filters  : {
						...rest,
						commodity : commodity || '20_standard',
						status    : 'active',
					},
					page       : activePagination.page,
					page_limit : 10,
				},
			});

			const { data } = res;
			setTrackers(data);
		} catch (err) {
			Toast.error('Unable to fetch shipments. Please try again.');
		}
	};

	useEffect(() => {
		if (Object.keys(activefilters).length > 0) {
			fetchTrackers();
		}
	}, [activePagination, activefilters]);

	const refetch = () => {
		if (Object.keys(activefilters).length > 0) {
			fetchTrackers();
		}
	};

	return {
		trackers,
		setTrackers,
		loading,
		activefilters,
		activePagination,
		fetchTrackers,
		setActiveFilters,
		setActivePagination,
		refetch,
	};
};

export default useFetchActiveTrend;
