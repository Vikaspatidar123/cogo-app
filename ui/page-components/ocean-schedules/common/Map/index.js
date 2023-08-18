import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

import useOceanRoute from '../../hooks/useOceanRoute';

import styles from './styles.module.css';

const CogoMaps = dynamic(() => import('@/ui/commons/components/CogoMaps'), { ssr: false });

function Map({
	portDetails = {},
	transportMode,
	billId = '',
}) {
	const [curvePoints, setCurvePoints] = useState([]);

	const {
		getOceanRoute, routeDataLength = false, setMapPoints, mapPoints,
	} = useOceanRoute();

	const { origin_port = {}, destination_port = {} } = portDetails || {};

	const originLength = Object.keys(origin_port).length;
	const destinationlength = Object.keys(destination_port).length;

	useEffect(() => {
		if (billId === '') {
			setMapPoints([]);
		}
	}, [billId, setMapPoints]);

	useEffect(() => {
		if (originLength > 0 && destinationlength > 0) {
			getOceanRoute(origin_port?.id, destination_port?.id);
		}
	}, [destination_port?.id, destinationlength, getOceanRoute, originLength, origin_port?.id, transportMode]);

	useEffect(() => {
		if (mapPoints?.length > 0) {
			const arr = (mapPoints || []).map((point) => ({
				lat : point[0],
				lng : point[1],
			}));
			setCurvePoints(arr);
		} else if (mapPoints?.length === 0) {
			setCurvePoints([]);
		}
	}, [mapPoints, transportMode]);

	return (
		<div>
			<CogoMaps
				plotPoints={curvePoints}
				transportMode="ocean"
				height="47vh"
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
