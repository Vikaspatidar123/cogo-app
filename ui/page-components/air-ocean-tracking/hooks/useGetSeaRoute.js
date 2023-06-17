import { isEmpty } from '@cogoport/utils';
import { useCallback, useEffect, useState } from 'react';

import { DEFAULT_LAT_INDEX, DEFAULT_LNG_INDEX } from '../constant/mapConstant';

import { useRequest } from '@/packages/request';

const getUniqueArrElements = (arr) => arr.reduce((accumulator, current) => {
	const found = accumulator.some(
		(item) => JSON.stringify(item) === JSON.stringify(current),
	);
	if (!found) {
		accumulator.push(current);
	}
	return accumulator;
}, []);

const useGetSeaRoute = ({ trackingInfo = [] }) => {
	const [allSeaRoute, setAllSeaRoute] = useState([]);
	const [{ loading }, trigger] = useRequest({
		method : 'get',
		url    : 'https://api.cogoport.com/location/get_multiple_sea_routes',
	}, { manual: true });

	const getSeaRoute = useCallback(async ({ coordinates = [] }) => {
		try {
			const resp = await trigger({
				params: {
					points: {
						coordinates,
					},
				},
			});
			const apiData = resp?.data || {};
			const routeInfo = apiData?.routes || [];
			const routeArr = (routeInfo || []).map((ele) => [ele?.route]).flat(2);
			const uniqueRouteArr = getUniqueArrElements(routeArr);

			return uniqueRouteArr;
		} catch (err) {
			console.log(err, 'err');
			return null;
		}
	}, [trigger]);

	const calcSeaRoute = useCallback(async () => {
		const promiseArr = (trackingInfo || []).map((ele) => {
			const { tracking_data = [] } = ele || {};

			const latLngArr = (tracking_data || [])
				.filter((info) => info?.latitude && info?.longitude)
				.map((info) => [+info.latitude, +info.longitude]);

			const uniqueLatLngArr = getUniqueArrElements(latLngArr);

			if (isEmpty(uniqueLatLngArr)) return undefined;
			if (uniqueLatLngArr.length === 1) return latLngArr;
			return getSeaRoute({ coordinates: uniqueLatLngArr });
		});

		const promiseValue = await Promise.allSettled(promiseArr);

		const mapPointArr = (trackingInfo || []).map((ele, index) => {
			const { container_no = '' } = ele || {};
			const mapPoints = promiseValue?.[index]?.value;

			const isRouteAvaliable = promiseValue?.[index]?.status === 'fulfilled' && mapPoints;

			let updatedRoute = [];

			if (isRouteAvaliable) {
				updatedRoute = mapPoints.map((point) => ({
					lat : point[DEFAULT_LAT_INDEX],
					lng : point[DEFAULT_LNG_INDEX],
				}));
			}

			return {
				containerNo : container_no,
				route       : updatedRoute,
			};
		});
		setAllSeaRoute(mapPointArr);
	}, [trackingInfo, getSeaRoute]);

	useEffect(() => {
		if (!isEmpty(trackingInfo)) {
			calcSeaRoute();
		}
	}, [calcSeaRoute, trackingInfo]);

	return {
		loading, allSeaRoute,
	};
};

export default useGetSeaRoute;
