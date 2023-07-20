import { isEmpty } from '@cogoport/utils';

import { useRequest } from '@/packages/request';

const LAT_INDEX = 1;
const LNG_INDEX = 0;

const useGetAllOceanRoutes = ({ setMapPoints }) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/get_multiple_sea_routes',
		method : 'get',
	}, { manual: true });

	const [{ loading: seaRouteLoading }, seaRouteTrigger] = useRequest({
		url        : 'get_container_sea_route',
		method     : 'post',
		autoCancel : false,
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
	const getAllOceanRoutes = async ({ ocean_data = {} }) => {
		try {
			const container_no = ocean_data?.container_details
				.map((c) => c.container_no)
				.flat();

			const request_data = {
				saas_container_subscriptions: [
					{
						saas_container_subscription_id : ocean_data?.id,
						type                           : ocean_data?.type,
						container_no,
					},
				],
			};
			const res = await seaRouteTrigger({ data: request_data });
			const apiRes = res?.data || [];

			if (!isEmpty(apiRes)) {
				const promiseArr = (container_no || []).map((containerNo) => {
					const container = (apiRes || []).filter(
						(r) => r?.container_no === containerNo,
					);
					if (isEmpty(container)) return undefined;

					const pre_points = (container || []).map((a) => a?.data).flat();

					const coordinates = {
						originLatLng      : pre_points?.[0],
						destinationLatLng : pre_points?.[pre_points.length - 1],
					};
					return getRoute({ coordinates });
				});
				const promiseValue = await Promise.allSettled(promiseArr);

				const mapPoint = (container_no || [])
					.map((containerNo, index) => {
						const container = (apiRes || []).filter(
							(r) => r?.container_no === containerNo,
						);

						if (isEmpty(container)) return undefined;

						const prePoint = (container || [])
							.flatMap((a) => a?.data)
							.map((pt) => [pt[LAT_INDEX], pt[LNG_INDEX]]);

						const isRouteAvaliable = promiseValue?.[index]?.status === 'fulfilled'
							&& promiseValue?.[index]?.value;

						const route = isRouteAvaliable
							? promiseValue?.[index]?.value
							: prePoint;

						return {
							container_no: containerNo,
							route,
						};
					})
					.filter((info) => info);

				setMapPoints((prev) => [...prev, ...mapPoint]);
			}
			return res.data;
		} catch (err) {
			return [];
		}
	};

	return { getRoute, routeLoading: loading || seaRouteLoading, getAllOceanRoutes };
};

export default useGetAllOceanRoutes;
