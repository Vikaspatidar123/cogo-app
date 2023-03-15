/* eslint-disable react-hooks/exhaustive-deps */
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

import useOceanRoute from '../../hooks/useOceanRoute';

import styles from './styles.module.css';

const CogoMaps = dynamic(() => import('./MapsComp'), { ssr: false });

function Map({
	portDetails = {},
	transportMode,
	billId = '',
	tradeEngineRespLength,
}) {
	const [curvePoints, setCurvePoints] = useState([]);

	const {
		getOceanRoute, routeDataLength = false, setMapPoints, mapPoints,
	} = useOceanRoute();

	const { origin_port = {}, destination_port = {} } = portDetails || {};

	const originLength = Object.keys(origin_port).length;
	const destinationlength = Object.keys(destination_port).length;

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
	}, []);

	useEffect(() => {
		if (originLength > 0 && destinationlength > 0) {
			if (transportMode === 'OCEAN') {
				getOceanRoute(origin_port?.id, destination_port?.id);
			}
		}
	}, [JSON.stringify(origin_port), JSON.stringify(destination_port)]);

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
	}, [JSON.stringify(mapPoints)]);

	return (
		<div>
			<CogoMaps
				plotPoints={curvePoints}
				tradeEngineRespLength={tradeEngineRespLength}
				origin={origin_port}
				destination={destination_port}
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
