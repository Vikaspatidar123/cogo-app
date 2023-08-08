import { useState, useEffect, useCallback } from 'react';

import { DEFAULT_FILTERS } from '../constants';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const getPalyload = ({ filters, profile, activeTab, id }) => {
	const {
		containerSize,
		containerType,
		commodities,
		shippingLine,
		validity_start,
		validity_end,
		filteredCurrency,
	} = filters;
	return {
		container_size       : containerSize,
		container_type       : containerType,
		shipping_line_id     : shippingLine,
		commodity            : commodities,
		currency             : filteredCurrency,
		validity_end,
		validity_start,
		performed_by_user_id : profile.id,
		frequency            : activeTab,
		id,
	};
};
const useFetchTrendDetails = ({ id, activeTab }) => {
	const { profile } = useSelector((state) => state);

	const { organization } = profile || {};

	const { country } = organization || {};

	const [filters, setFilters] = useState(DEFAULT_FILTERS({ country }));

	const [trendDetails, setTrendDetails] = useState({});

	const [{ loading }, fetchDetailsTrigger] = useRequest({
		url    : '/get_freight_trend_subscription',
		method : 'get',
	}, { manual: true });

	const fetchScheduleDetails = useCallback(async () => {
		const checkScheduleDetails = Object.keys(filters).length > 1;

		if (!checkScheduleDetails) {
			return;
		}

		try {
			const payload = getPalyload({ filters, profile, activeTab, id });
			const res = await fetchDetailsTrigger({
				params: payload,
			});
			const { data } = res;
			setTrendDetails(data);
		} catch (err) {
			console.error(err?.message);
		}
	}, [activeTab, fetchDetailsTrigger, filters, id, profile]);

	useEffect(() => {
		fetchScheduleDetails();
	}, [filters, activeTab, fetchScheduleDetails]);

	const refetch = () => fetchScheduleDetails(false);

	return {
		loading,
		trendDetails,
		filters,
		setFilters,
		refetch,

	};
};

export default useFetchTrendDetails;
