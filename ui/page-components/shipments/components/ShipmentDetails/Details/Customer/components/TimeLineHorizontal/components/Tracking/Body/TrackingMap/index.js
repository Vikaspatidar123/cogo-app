import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react';

import styles from './styles.module.css';

import { Image } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const CogoMaps = dynamic(() => import('./map'), { ssr: false });
const SET_TIME = 0;
function TrackingMap({
	points = [],
	routesLoading = false,
	shipmentType,
}) {
	const [isLoading, setLoading] = useState(true);
	const [curvePoints, setCurvePoints] = useState([]);
	const [remainingPoints, setRemainingPoints] = useState([]);
	const point = shipmentType === 'ocean' ? curvePoints : points;
	useEffect(() => {
		if (points?.length > 0 && shipmentType === 'ocean') {
			points?.map((p) => {
				setRemainingPoints((prevPoints) => [
					...prevPoints,
					{
						lat : p?.[GLOBAL_CONSTANTS.one_index],
						lng : p?.[GLOBAL_CONSTANTS.zeroth_index],
					},
				]);
				setCurvePoints((prevPoints) => [
					...prevPoints,
					{
						lat : p?.[GLOBAL_CONSTANTS.one_index],
						lng : p?.[GLOBAL_CONSTANTS.zeroth_index],
					},
				]);
				return true;
			});
			setTimeout(() => {
				setLoading(false);
			}, SET_TIME);
		} else {
			setTimeout(() => {
				setLoading(false);
			}, SET_TIME);
		}
	}, [points, points?.length, shipmentType]);

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
			<CogoMaps curvePoints={point} remainingPoints={remainingPoints} />
		</div>
	);
}

export default TrackingMap;
