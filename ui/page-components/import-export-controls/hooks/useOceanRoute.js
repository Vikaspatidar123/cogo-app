import { useState } from 'react';

import { useRequest } from '@/packages/request';

const useOceanRoute = () => {
	const [routeDataLength, setRouteDataLength] = useState();
	// const { setMapPoints } = useSaasState();

	const [{ loading }, oceanRouteTrigger] = useRequest({
		method : 'get',
		url    : '/get_sea_route',
	}, { manual: true });

	const getOceanRoute = async (origin_port_id, destination_port_id) => {
		try {
			const resp = await oceanRouteTrigger({
				params: {
					origin_port_id,
					destination_port_id,
					enable_sea_route_processing: true,
				},
			});
			const respData = resp?.data?.the_geom;
			// setMapPoints(respData);
			setRouteDataLength(respData?.length === 0);
		} catch (err) {
			console.error(err?.error?.message);
		}
	};
	return {
		getOceanRoute,
		routesLoading: loading,
		routeDataLength,
	};
};

export default useOceanRoute;
