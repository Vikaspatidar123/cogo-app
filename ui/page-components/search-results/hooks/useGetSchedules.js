import { useState, useEffect } from 'react';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useGetSchedules = () => {
	const { query } = useSelector(({ general }) => general);
	const [scheduleList, setScheduleList] = useState();

	const [{ loading }, trigger] = useRequest(
		{
			url    : 'get_spot_search_schedules',
			method : 'get',
		},
		{ manual: true },
	);

	const getSchedules = () => {
		trigger({
			params: {
				spot_search_id: query?.search_id,
			},
		})
			.then((response) => {
				const data = response.data || {};
				setScheduleList(data.list);
			})
			.catch(() => {});
	};
	useEffect(() => {
		getSchedules();
	}, []);

	return { scheduleList, getSchedules, loading };
};

export default useGetSchedules;
