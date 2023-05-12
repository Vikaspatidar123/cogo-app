/* eslint-disable react-hooks/exhaustive-deps */
import { Toast } from '@cogoport/components';
import { useState, useEffect, useCallback } from 'react';

import { prepareFilters } from '../common/utils';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useArchiveList = ({ archived }) => {
	const [airTrackers, setAirTrackers] = useState(null);
	const [filters, setFilters] = useState({});
	const [pagination, setPagination] = useState({ page: 1 });

	const { general } = useSelector((s) => s);
	const [{ loading }, trigger] = useRequest({
		url    : '/list_saas_air_subscriptions',
		method : 'get',
	}, { manual: true });
	const fetchTrackers = useCallback(async () => {
		try {
			const res = await trigger({
				params: {
					filters: {
						organization_branch_id : general?.query?.branch_id,
						...prepareFilters(filters, airTrackers?.filter_data ?? {}),
						status                 : 'completed',
					},
					page       : pagination.page,
					page_limit : 10,
				},
			});

			const { data } = res || {};

			setAirTrackers(data);
		} catch (err) {
			console.log(err);
			// Toast.error('Cannot fetch store quota. Please try again later.');
		}
	}, [filters, trigger]);

	useEffect(() => {
		fetchTrackers();
	}, [filters, pagination, archived]);

	const refetch = () => fetchTrackers(false);

	return {
		loading,
		trackers: airTrackers,
		setAirTrackers,
		fetchTrackers,
		filters,
		pagination,
		setFilters,
		setPagination,
		refetch,
	};
};

export default useArchiveList;
