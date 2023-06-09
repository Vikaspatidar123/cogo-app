/* eslint-disable react-hooks/exhaustive-deps */
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

import useOceanRoute from '../../hooks/useOceanRoute';

import styles from './styles.module.css';

const Cogomaps = dynamic(
	() => import('@/ui/commons/components/CogoMaps'),
	{
		ssr: false,
	},
);

const style = {
	borderRadius: '18px',
};
const createBezier = (inputPoints, step, setCurvePoints) => {
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
			const lat_x =				(1 - t) * ((1 - t) * x1 + t * x2) + t * ((1 - t) * x2 + t * x3);

			x1 = parseFloat(inputPoints[0].lng);
			x3 = parseFloat(inputPoints[1].lng);
			x2 = (x1 + x3) / 2;
			const lng_x =				(1 - t) * ((1 - t) * x1 + t * x2) + t * ((1 - t) * x2 + t * x3);

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

function MapContainer({ formInfo = {}, mapZoom = 2.7, height = '480px' }) {
	const [curvePoints, setCurvePoints] = useState([]);
	const { transportMode, exportCountry = {}, importCountry = {} } = formInfo || {};

	const originId = importCountry?.id;
	const destinationId = exportCountry?.id;
	const { getOceanRoute, mapPoints, setMapPoints } = useOceanRoute();
	useEffect(() => {
		if (originId && destinationId) {
			if (transportMode === 'ocean') {
				getOceanRoute(destinationId, originId);
			} else if (transportMode === 'air') {
				setMapPoints([
					{
						arrivalLatitude    : importCountry?.latitude,
						arrivalLongitude   : importCountry?.longitude,
						departureLatitude  : exportCountry?.latitude,
						departureLongitude : exportCountry?.longitude,
					},
				]);
			}
		}
	}, [originId, destinationId, transportMode]);

	useEffect(() => {
		if (mapPoints.length > 0) {
			if (transportMode === 'ocean') {
				const arr = (mapPoints || []).map((point) => ({
					lat : point[0],
					lng : point[1],
				}));
				setCurvePoints(arr);
			}

			if (transportMode === 'air') {
				(mapPoints || []).map((p) => {
					const pointArr = [
						p?.arrivalLatitude,
						p?.arrivalLongitude,
						p?.departureLatitude,
						p?.departureLongitude,
					];
					const isValidPtArr = pointArr.every((pt) => pt);
					if (isValidPtArr) {
						const source = {
							lat : p?.departureLatitude,
							lng : p?.departureLongitude,
						};
						const dest = {
							lat : p?.arrivalLatitude,
							lng : p?.arrivalLongitude,
						};
						createBezier([source, dest], 0.001, setCurvePoints);
						return true;
					}
					return false;
				});
			}
		} else if (mapPoints?.length === 0) {
			setCurvePoints([]);
		}
	}, [mapPoints]);

	return (
		<div className={styles.container}>
			<Cogomaps
				plotPoints={curvePoints}
				isMobile={false}
				zoom={mapZoom}
				height={height}
				style={style}
			/>
		</div>
	);
}

export default MapContainer;
