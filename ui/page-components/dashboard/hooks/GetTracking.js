import { useEffect, useCallback } from 'react';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

function GetTracking() {
	const { query, country_id, kyc_status } = useSelector(({ general, profile }) => ({
		query      : general?.query,
		country_id : profile?.organization?.country_id,
		kyc_status : profile?.organization?.kyc_status,
	}));
	const [{ loading, data: air_track }, trigger] = useRequest({
		url    : '/get_app_dashboard_tracking',
		method : 'get',
	}, { manual: true });
	const airTracking = air_track?.dashboard_products?.air_tracking || {};
	const oceanTracking = air_track?.dashboard_products?.container_tracking	|| {};
	const schedulesData = useCallback(async (organization_id) => {
		try {
			const reqData = {
				organization: organization_id,

			};
			const res = await trigger({ params: reqData });
			const { datas } = res;
			return datas;
		} catch (err) {
			console.log(
				err?.message || ' Please try again.',
			);
			return null;
		}
	}, [trigger]);

	useEffect(() => {
		schedulesData();
	}, [schedulesData]);
	return { loading, schedulesData, query, airTracking, oceanTracking, country_id, kyc_status };
}
export default GetTracking;
