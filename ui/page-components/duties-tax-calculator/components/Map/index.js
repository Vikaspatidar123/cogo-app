import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

import styles from './styles.module.css';

const CogoMaps = dynamic(
	() => import('@/ui/commons/components/CogoMaps'),
	{
		ssr: false,
	},
);
function Map({
	portDetails = {},
	transportMode,
	billId = '',
	isTradeEngineRespEmpty,
	getOceanRoute,
	routeDataLength = false,
	setMapPoints,
	mapPoints,
	mapZoom = 2.7,
}) {
	const [curvePoints, setCurvePoints] = useState([]);
	const { origin = {}, destination = {} } = portDetails || {};

	const originLength = Object.keys(origin).length;
	const destinationlength = Object.keys(destination).length;

	const createBezier = (inputPoints, step) => {
		let t = 0;
		const bezierPoints = [];
		while (t <= 1) {
			try {
				let x1;
				let x2;
				let x3;

				x1 = parseFloat(inputPoints[0].lat);
				x3 = parseFloat(inputPoints[1].lat);
				x2 = Math.max(x1, x3) + 20;
				const lat_x = (1 - t) * ((1 - t) * x1 + t * x2) + t * ((1 - t) * x2 + t * x3);

				x1 = parseFloat(inputPoints[0].lng);
				x3 = parseFloat(inputPoints[1].lng);
				x2 = (x1 + x3) / 2;
				const lng_x = (1 - t) * ((1 - t) * x1 + t * x2) + t * ((1 - t) * x2 + t * x3);

				bezierPoints.push({
					lat : lat_x,
					lng : lng_x,
				});
			} catch (err) {
				t = 1;
			}
			t += step;
		}
		setCurvePoints([...bezierPoints]);
	};

	useEffect(() => {
		if (billId === '') {
			setMapPoints([]);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (originLength > 0 && destinationlength > 0) {
			if (transportMode === 'OCEAN') {
				getOceanRoute(origin?.id, destination?.id);
			} else if (transportMode === 'AIR') {
				setMapPoints([
					{
						departureLatitude  : origin?.latitude,
						departureLongitude : origin?.longitude,
						arrivalLatitude    : destination?.latitude,
						arrivalLongitude   : destination?.longitude,
					},
				]);
			}
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(origin), JSON.stringify(destination)]);

	useEffect(() => {
		if (mapPoints?.length > 0) {
			if (transportMode === 'OCEAN') {
				const arr = (mapPoints || []).map((point) => ({
					lat : point[0],
					lng : point[1],
				}));
				setCurvePoints(arr);
			}

			if (transportMode === 'AIR') {
				(mapPoints || []).map((pt) => {
					if (
						![
							pt.arrivalLatitude,
							pt.arrivalLongitude,
							pt.departureLatitude,
							pt.departureLongitude,
						].includes(null)
						&& ![
							pt.arrivalLatitude,
							pt.arrivalLongitude,
							pt.departureLatitude,
							pt.departureLongitude,
						].includes(undefined)
					) {
						const source = {
							lat : pt.departureLatitude,
							lng : pt.departureLongitude,
						};
						const dest = {
							lat : pt.arrivalLatitude,
							lng : pt.arrivalLongitude,
						};
						createBezier([source, dest], 0.001);
						return true;
					}
					return false;
				});
			}
		} else if (mapPoints?.length === 0) {
			setCurvePoints([]);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(mapPoints)]);

	return (
		<div className={`${styles.without_mobile} ${styles.with_mobile}`}>
			<CogoMaps
				plotPoints={curvePoints}
				lengthDependency={isTradeEngineRespEmpty}
				origin={origin}
				destination={destination}
				transportMode={transportMode.toLowerCase()}
				zoom={mapZoom}

			/>
			{routeDataLength && curvePoints.length === 0 && (
				<div className={styles.loader}>
					<div className={styles.map_unable}>Unable to load map for this shipment</div>
				</div>
			)}
		</div>
	);
}

export default Map;
