import { Toast } from '@cogoport/components';
import { useState, useEffect } from 'react';

import { useRequest } from '@/packages/request';

function GetTracking() {
	const [{ loading, data: air_track }, trigger] = useRequest({
		url    : '/get_app_dashboard_tracking',
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
	}, []);
	return { loading, schedulesData, air_track };
}
export default GetTracking;
