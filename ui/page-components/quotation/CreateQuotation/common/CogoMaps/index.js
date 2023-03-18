import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

import styles from './styles.module.css';

const CogoMaps = dynamic(() => import('./MapComp'), { ssr: false });

function Map({
	transportMode,
	mapPoints,
	height,
	mapInitialZoom,
	mapStyle,
}) {
	const [curvePoints, setCurvePoints] = useState([]);

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
		if (mapPoints.length > 0) {
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
		} else if (mapPoints.length === 0) {
			setCurvePoints([]);
		}
	}, [JSON.stringify(mapPoints)]);

	return (
		<div>
			<div className={styles.map_container}>
				<CogoMaps
					plotPoints={curvePoints}
					height={height}
					zoom={mapInitialZoom}
					mapStyle={mapStyle}
				/>
			</div>
			{curvePoints.length === 0 && (
				<div className={styles.loader_container}>
					<div className={styles.map_unable}>
						Unable to load map for this shipment
					</div>
					<div className={styles.overlay} />
				</div>
			)}
		</div>
	);
}

export default Map;
