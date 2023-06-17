import { useRequest } from '@/packages/request';

const useGetAllOceanRoutes = () => {
	const [{ loading }, trigger] = useRequest({
		url    : 'get_multiple_sea_routes',
		method : 'get',
	}, { manual: true });

	const getRoute = async ({ coordinates = {} }) => {
		try {
			const { originLatLng = [], destinationLatLng = [] } = coordinates || {};
			const resp = await trigger({
				params: {
					points: {
						coordinates: [
							[originLatLng?.[1], originLatLng?.[0]],
							[destinationLatLng?.[1], destinationLatLng?.[0]],
						],
					},
				},
			});
			const apiResp = resp?.data || {};
			const routeInfo = apiResp?.routes || [];
			const routeArr = (routeInfo || []).map((ele) => [ele?.route]).flat(2);

			return routeArr;
		} catch (err) {
			return null;
		}
	};

	return { getRoute, routeLoading: loading };
};

export default useGetAllOceanRoutes;
