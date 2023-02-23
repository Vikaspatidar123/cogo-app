import { Toast } from '@cogoport/components';
import { useState } from 'react';

import useFetchTrends from './useFetchTrends';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useDeleteTrendSubscription = () => {
	const { profile } = useSelector((state) => state);
	const [trendData, setTrendData] = useState();
	const { refectTrends } = useFetchTrends(10);

	const [{ loading }, deleteTrendTrigger] = useRequest({
		url    : '/delete_freight_trend_subscription',
		method : 'post',
	}, { manual: true });

	const deleteTrend = async (id) => {
		try {
			const res = await deleteTrendTrigger({
				params: {
					id,
					status          : 'inactive',
					performed_by_id : profile.id,
				},
			});
			Toast.success('Deleted Successfully', {
				style: { background: '#ecfccb' },
			});
			refectTrends();
			setTrendData(res.data);
		} catch (err) {
			Toast.error(err?.message || 'Something went wrong');
		}
	};

	return {
		loading,
		trendData,
		deleteTrend,
	};
};

export default useDeleteTrendSubscription;
