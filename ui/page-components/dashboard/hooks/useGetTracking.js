import { useEffect, useCallback } from 'react';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const getPayload = ({ orgId }) => ({
	organization: orgId,
});

function useGetTracking() {
	const { kyc_status, organizationId } = useSelector(({ profile }) => ({
		kyc_status     : profile?.organization?.kyc_status,
		organizationId : profile?.organization?.id,
	}));

	const [{ data }, trigger] = useRequest({
		url    : '/get_app_dashboard_tracking',
		method : 'get',
	}, { manual: true });

	const {
		air_tracking: airTracking = {},
		container_tracking: oceanTracking = {},
	} = data?.dashboard_products || {};

	const getDashboardTrackingInfo = useCallback(() => {
		try {
			trigger({
				params: getPayload({ orgId: organizationId }),
			});
		} catch (err) {
			console.error(err?.message || ' Please try again.');
		}
	}, [organizationId, trigger]);

	useEffect(() => {
		getDashboardTrackingInfo();
	}, [getDashboardTrackingInfo]);

	return { airTracking, oceanTracking, kyc_status };
}
export default useGetTracking;
