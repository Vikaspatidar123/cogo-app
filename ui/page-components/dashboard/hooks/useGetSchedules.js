import { useState, useEffect } from 'react';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useGetSchedules = () => {
	const { profile } = useSelector((state) => state);

	const [loading, setLoading] = useState(false);
	const [schedulesData, setSchedulesData] = useState(null);

	// const getSchedules = useRequest(
	// 	'get',
	// 	false,
	// 	scope,
	// )('/get_app_dashboard_schedule');

	const [{ data }, trigger] = useRequest({
		method : 'get',
		url    : '/get_app_dashboard_schedule',
	}, { manual: true });

	const getSchedulesData = async () => {
		const params = { organization_id: profile.organization.id };
		try {
			setLoading(true);
			const res = await trigger({ params });
			if (!res.hasError) {
				setSchedulesData(res.data);
			}
			setLoading(false);
			return res;
		} catch (err) {
			setLoading(false);
			return false;
		}
	};

	useEffect(() => {
		getSchedulesData();
	}, []);

	return {
		schedulesData,
		loading,
	};
};

export default useGetSchedules;
