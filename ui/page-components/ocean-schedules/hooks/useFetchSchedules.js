import { Toast } from '@cogoport/components';
import { useState, useEffect, useCallback } from 'react';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useFetchSchedules = ({ pageLimit = 10, currentPage }) => {
	const [filters, setFilters] = useState({});
	const [schedules, setSchedules] = useState();
	const { general } = useSelector((state) => state);

	const [{ loading }, trigger] = useRequest({
		method : 'get',
		url    : '/list_sailing_schedule_subscriptions',
	}, { manual: true });

	const prepareFilters = () => {};

	const fetchSchedules = useCallback(async () => {
		try {
			const res = await trigger({
				params: {
					filters: {
						organization_branch_id : general?.query?.branch_id,
						...prepareFilters(filters, schedules?.filter_data ?? {}),
						status                 : 'active',
					},
					page       : currentPage,
					page_limit : pageLimit,
				},
			});
			const { hasError } = res || {};
			if (hasError) throw new Error();

			const { data } = res;
			setSchedules(data);
		} catch (err) {
			Toast.error('Unable to fetch schedules. Please try again.');
		}
	}, [currentPage, filters, general?.query?.branch_id, pageLimit, schedules?.filter_data, trigger]);

	useEffect(() => {
		fetchSchedules();
	}, [filters, currentPage, fetchSchedules]);

	return {
		loading,
		filters,
		setFilters,
		fetchSchedules,
		schedules,
	};
};

export default useFetchSchedules;
