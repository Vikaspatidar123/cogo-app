import { useRequest } from '@cogo/commons/hooks';
import { useSelector } from '@cogo/store';
import { useState, useEffect } from 'react';

const useGetSchedules = () => {
	const { query, scope } = useSelector(({ general }) => general);
	const [scheduleList, setScheduleList] = useState();

	const { trigger } = useRequest(
		'get',
		false,
		scope,
	)('/get_spot_search_schedules');

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
		if (scope === 'app') getSchedules();
	}, []);

	return { scheduleList, getSchedules };
};

export default useGetSchedules;
