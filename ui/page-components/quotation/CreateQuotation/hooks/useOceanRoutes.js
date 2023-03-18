import { useRequest } from '@/packages/request';

const useOceanRoutes = ({ setMapPoints }) => {
	const [{ loading }, trigger] = useRequest({
		method : 'get',
		url    : 'https://api.cogoport.com/location/get_sea_route',
	}, { manual: true });

	const getOceanRoute = async (origin_port_id, destination_port_id) => {
		try {
			const resp = await trigger({
				params: {
					origin_port_id,
					destination_port_id,
				},
			});
			const respData = resp?.data?.the_geom;
			setMapPoints(respData);
		} catch (err) {
			console.error(err?.error?.message);
		}
	};
	return {
		getOceanRoute,
		routesLoading: loading,
	};
};

export default useOceanRoutes;
