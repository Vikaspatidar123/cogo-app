import { useState, useEffect } from 'react';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useFetchTrendDetails = ({ id, activeTab }) => {
	const [filters, setFilters] = useState({});
	const [trendDetails, setTrendDetails] = useState({});
	const [{ loading }, fetchDetailsTrigger] = useRequest({
		url: '/get_freight_trend_subscription',
		method: 'get',
	}, { manual: true });
	const { profile } = useSelector((state) => state);
	const now = new Date();
	const fetchScheduleDetails = async () => {
		const checkScheduleDetails = Object.keys(filters).length > 1;

		if (!checkScheduleDetails) {
			return;
		}

		try {
			const {
				container_size,
				container_type,
				commodity,
				shipping_line_id,
				validity_start,
				validity_end,
				currency,
			} = filters;
			const res = await fetchDetailsTrigger({
				params: {
					container_size: container_size || '20',
					container_type,
					commodity,
					shipping_line_id,
					validity_start: validity_start || new Date(now.setMonth(now.getMonth() - 6)),
					validity_end:
						validity_end || new Date(new Date().setMonth(new Date().getMonth() + 1)),
					currency,
					performed_by_user_id: profile.id,
					id,
					frequency: activeTab,
				},
			});
			const { data } = res;
			setTrendDetails(data);
		} catch (err) {
			console.log(err?.message || 'Something went wrong');
		}
	};

	useEffect(() => {
		fetchScheduleDetails();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filters, activeTab]);

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
