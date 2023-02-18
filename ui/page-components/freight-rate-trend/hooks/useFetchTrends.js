import { useState, useEffect } from 'react';
import toast from '@cogoport/front/components/admin/Toast';
import { useRequest } from '@cogo/commons/hooks';

import { useSaasState } from '../../../common/context';
import { prepareFilters } from '../common/utils';

const useFetchTrends = ({ pageLimit = 10 }) => {
	const [loading, setLoading] = useState(false);
	const [filters, setFilters] = useState({});
	const [pagination, setPagination] = useState({ page: 1 });
	const { general, freightTrends, setFreightTrends } = useSaasState();
	const { scope } = general;

	const trend = useRequest('get', false, scope, { autoCancel: false })(
		'/list_freight_trend_subscriptions',
	);

	const fetchTrends = async (showLoading = true) => {
		try {
			if (showLoading) setLoading(true);
			const res = await trend.trigger({
				params: {
					filters: { ...prepareFilters(filters, freightTrends?.filter_data ?? {}) },
					page: pagination.page,
					page_limit: pageLimit,
				},
			});
			if (showLoading) setLoading(false);
			const { hasError } = res || {};
			if (hasError) throw new Error();

			const { data } = res;
			setFreightTrends(data);
		} catch (err) {
			console.log(err, 'error');
			if (Object.keys(err).length > 1)
				toast.error('Unable to fetch trend. Please try again.');
			if (showLoading) setLoading(false);
		}
	};

	useEffect(() => {
		fetchTrends();
	}, [filters, pagination]);

	const refectTrends = () => fetchTrends(false);

	return {
		loading,
		filters,
		pagination,
		setLoading,
		setFilters,
		setPagination,
		refectTrends,
	};
};

export default useFetchTrends;
