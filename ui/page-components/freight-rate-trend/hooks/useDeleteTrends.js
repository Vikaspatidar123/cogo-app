import { useState } from 'react';
import toast from '@cogoport/front/components/admin/Toast';
import request from '../../../common/utils/request';
import { useSaasState } from '../../../common/context';
import useFetchTrends from './useFetchTrends';

const useDeleteTrendSubscription = () => {
	const { general, profile } = useSaasState();
	const { refectTrends } = useFetchTrends(10);
	const [loading, setLoading] = useState(false);
	const [trendData, setTrendData] = useState();

	const { scope } = general;
	const deleteTrend = async (id, showLoading = true) => {
		try {
			if (showLoading) setLoading(true);
			const res = await request({
				scope,
				method: 'post',
				url: '/delete_freight_trend_subscription',
				params: {
					id,
					status: 'inactive',
					performed_by_id: profile.id,
				},
			});
			if (showLoading) setLoading(false);
			toast.success('Deleted Successfully', {
				style: { background: '#ecfccb' },
			});
			refectTrends();
			setTrendData(res.data);
		} catch (err) {
			toast.error(err?.message || 'Something went wrong');
			if (showLoading) setLoading(false);
		}
	};

	return {
		loading,
		trendData,
		deleteTrend,
	};
};

export default useDeleteTrendSubscription;
