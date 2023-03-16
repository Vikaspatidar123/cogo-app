import { Toast } from '@cogoport/components';
import { useState, useEffect } from 'react';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useFetchSchedules = ({ currentPage }) => {
	const [filters, setFilters] = useState({});
	const [schedules, setSchedules] = useState();
	const { general } = useSelector((state) => state);

	const prepareFilters = () => {};

	const [{ loading }, trigger] = useRequest({
		method : 'get',
		url    : '/list_saas_air_schedule_subscription',
	}, { manual: true });

	const fetchSchedules = async () => {
		try {
			const res = await trigger({
				params: {
					filters: {
						organization_branch_id : general?.query?.branch_id,
						...prepareFilters(filters, schedules?.filter_data ?? {}),
						status                 : 'active',
					},
					page: currentPage,
				},
			});
			const { hasError } = res || {};
			if (hasError) throw new Error();

			const { data } = res;
			setSchedules(data);
		} catch (err) {
			Toast.error('Unable to fetch schedules. Please try again.');
		}
	};

	useEffect(() => {
		fetchSchedules();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filters, currentPage]);

	return {
		loading,
		filters,
		setFilters,
		fetchSchedules,
		schedules,
	};
};

export default useFetchSchedules;
