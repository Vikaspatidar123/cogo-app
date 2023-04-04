import { useRequest } from '@cogo/commons/hooks';
import { useState } from 'react';

import { useSaasState } from '../../../common/context';

const useOceanRoute = () => {
	const [routeDataLength, setRouteDataLength] = useState();
	const { setMapPoints } = useSaasState();
	const { trigger: oceanRouteTrigger, loading } = useRequest(
		'get',
		false,
		'app',
	)('https://api.cogoport.com/location/get_sea_route');

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
