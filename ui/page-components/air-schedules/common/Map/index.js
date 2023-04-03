import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

import styles from './styles.module.css';

const CogoMaps = dynamic(() => import('./MapsComp'), { ssr: false });

function Map({
	portDetails = {},
	transportMode,
	mapPoints,
}) {
	const [curvePoints, setCurvePoints] = useState([]);

	const { origin_port = {}, destination_port = {} } = portDetails || {};

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
		if (mapPoints?.length > 0) {
			if (transportMode === 'AIR') {
				(mapPoints || []).map((pt) => {
					if (
						![
							pt.arrival_lat,
							pt.arrival_long,
							pt.departure_lat,
							pt.departure_long,
						].includes(null)
						&& ![
							pt.arrival_lat,
							pt.arrival_long,
							pt.departure_lat,
							pt.departure_long,
						].includes(undefined)
					) {
						const source = {
							lat : pt.departure_lat,
							lng : pt.departure_long,
						};
						const dest = {
							lat : pt.arrival_lat,
							lng : pt.arrival_long,
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
	}, [mapPoints, transportMode]);

	return (
		<div>
			<CogoMaps
				plotPoints={curvePoints}
				origin={origin_port}
				destination={destination_port}
			/>
			{curvePoints.length === 0 && (
				<div className={styles.loader}>
					<div className={styles.map_unable}>Unable to load map for this shipment</div>
				</div>
			)}
		</div>
	);
}

export default Map;
