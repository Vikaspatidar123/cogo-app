import { useState, useEffect } from 'react';

import { useRouter } from '@/packages/next';
import { useRequest } from '@/packages/request';

const useGetSchedules = () => {
	const { query } = useRouter();

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
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return { scheduleList, getSchedules, loading };
};

export default useGetSchedules;
