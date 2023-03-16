import { Toast } from '@cogoport/components';
import { useState } from 'react';

import { useRequest } from '@/packages/request';

const useOceanRoute = () => {
	const [routeDataLength, setRouteDataLength] = useState();
	const [mapPoints, setMapPoints] = useState();
	const [{ loading }, oceanRouteTrigger] = useRequest({
		url    : 'https://api.cogoport.com/location/get_sea_route',
		method : 'get',
	}, { manual: true });
	const getOceanRoute = async (origin_port_id, destination_port_id) => {
		try {
			const resp = await oceanRouteTrigger({
				params: {
					origin_port_id,
					destination_port_id,
				},
			});

			const respData = resp?.data?.the_geom;
			setMapPoints(respData);
			setRouteDataLength(respData?.length === 0);
		} catch (err) {
			Toast.error(err?.error?.message);
		}
	};

	return {
		getOceanRoute,
		routesLoading: loading,
		routeDataLength,
		setMapPoints,
		mapPoints,
	};
};
export default useOceanRoute;
