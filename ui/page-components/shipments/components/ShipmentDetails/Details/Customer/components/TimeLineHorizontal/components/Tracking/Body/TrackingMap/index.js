import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react';

import styles from './styles.module.css';

const CogoMaps = dynamic(() => import('./map'), { ssr: false });

function TrackingMap({
	points = [],
	routesLoading = false,
}) {
	const [isLoading, setLoading] = useState(true);
	const [curvePoints, setCurvePoints] = useState([]);
	const [remainingPoints, setRemainingPoints] = useState([]);

	useEffect(() => {
		if (points?.length > 0) {
			points?.map((p) => {
				let c = p;
				if (typeof p?.[0] === 'object') {
					c = p.flat();
				}
				setRemainingPoints((prevPoints) => [
					...prevPoints,
					{
						lat : c?.[1],
						lng : c?.[0],
					},
				]);
				setCurvePoints((prevPoints) => [
					...prevPoints,
					{
						lat : c?.[1],
						lng : c?.[0],
					},
				]);
				return true;
			});
			setTimeout(() => {
				setLoading(false);
			}, 0);
		} else {
			setTimeout(() => {
				setLoading(false);
			}, 0);
		}
	}, [points, points?.length]);

	if (routesLoading || isLoading) {
		return (
			<div className={styles.map}>
				<img
					src="https://cogoport-maps.s3.ap-south-1.amazonaws.com/world+(2).svg"
					alt="map-loader"
					width="100%"
					height={700}
				/>
			</div>
		);
	}

	return (
		<div className={styles.map}>
			<CogoMaps
				remainingPoints={remainingPoints}
				curvePoints={curvePoints}
			/>
		</div>
	);
}

export default TrackingMap;
