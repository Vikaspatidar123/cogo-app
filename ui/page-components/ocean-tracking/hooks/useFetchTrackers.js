import { useState, useEffect } from 'react';

import { prepareFilters } from '../common/utils';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useFetchTrackers = () => {
	const [trackers, setTrackers] = useState(null);
	const [filters, setFilters] = useState({});
	const [pagination, setPagination] = useState({ page: 1 });

	const { general } = useSelector((s) => s);
	const [{ loading }, trigger] = useRequest({
		url    : 'list_saas_container_subscriptions',
		method : 'get',
	}, { manual: true });

	const fetchTrackers = async () => {
		try {
			const res = await trigger({
				params: {
					filters: {
						organization_branch_id : general?.query?.branch_id,
						...prepareFilters(filters, trackers?.filter_data ?? {}),
						...filters,
						status                 : 'active',
					},
					page       : pagination.page,
					page_limit : 10,
				},
			});

			const { data } = res || {};

			setTrackers(data);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fetchTrackers();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filters, pagination]);

	const refetch = () => fetchTrackers(false);

	return {
		loading,
		trackers,
		setTrackers,
		fetchTrackers,
		filters,
		pagination,
		setFilters,
		setPagination,
		refetch,
	};
};

export default useFetchTrackers;
