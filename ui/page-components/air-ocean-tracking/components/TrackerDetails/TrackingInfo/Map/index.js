import { isEmpty } from '@cogoport/utils';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

import useGetMapRoute from '../../../../hooks/useGetMapRoute';

import styles from './styles.module.css';

const CogoMaps = dynamic(() => import('./MapComps'), { ssr: false });

function Map({
	data = {},
	trackingType = 'ocean',
	height = '80vh',
	// loading = false,
	points = [],
	trackingInfo = [],
	currContainerDetails = {},
}) {
	const [currentRoute, setCurrentRoute] = useState([]);

	const payloadMapping = {
		ocean : trackingInfo,
		air   : !isEmpty(data) ? [data] : [],
	};

	const { loading, allRoute = [] } = useGetMapRoute({
		trackingInfo : payloadMapping[trackingType],
		type         : trackingType,
	});

	useEffect(() => {
		if (!isEmpty(currContainerDetails)) {
			const currentTrackingInfo = allRoute.filter(
				(info) => info?.containerNo === currContainerDetails?.container_no
				|| info?.airWayNo === currContainerDetails?.airway_bill_no,
			)[0];

			setCurrentRoute(currentTrackingInfo?.route);
		}
	}, [allRoute, currContainerDetails]);

	return (
		<div className={styles.container}>
			<div className={`${isEmpty(points) ? styles.blur_screennnnn : ''}`}>
				<CogoMaps height={height} pointsArr={currentRoute} type={trackingType} />
			</div>
			{/* {isEmpty(points) && (
				<div className={styles.empty_state}>
					<h3>Unable to load map for this shipment</h3>
				</div>
			)} */}
		</div>
	);
}
export default Map;
