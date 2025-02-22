import { Toast } from '@cogoport/components';
import { useEffect } from 'react';

import { useRequest } from '@/packages/request';

function useGetSchedules() {
	const [{ loading, data: air_data }, trigger] = useRequest({
		url    : '/get_app_dashboard_schedule',
		method : 'get',
	}, { manual: true });

	const schedulesData = async (organization_id) => {
		try {
			const reqData = {
				organization: organization_id,

			};
			const res = await trigger({ params: reqData });
			const { datas } = res;
			return datas;
		} catch (err) {
			Toast.error(
				err?.message || ' Please try again.',
			);
			return null;
		}
	};

	useEffect(() => {
		schedulesData();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return { loading, schedulesData, air_data };
}
export default useGetSchedules;
