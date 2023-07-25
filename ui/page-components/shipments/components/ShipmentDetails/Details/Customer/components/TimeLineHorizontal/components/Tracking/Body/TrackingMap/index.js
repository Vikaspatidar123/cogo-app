import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react';

import styles from './styles.module.css';

import { Image } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

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
				<Image
					src={GLOBAL_CONSTANTS.image_url.map_loading}
					width={600}
					height={600}
					alt="loading"
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
