import { isEmpty } from '@cogoport/utils';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

import styles from './styles.module.css';

import useGetSeaRoute from '@/ui/page-components/air-ocean-tracking/hooks/useGetSeaRoute';

const CogoMaps = dynamic(() => import('./MapComps'), { ssr: false });

function Map({
	vesselLocationLat,
	vesselLocationLang,
	trackingType = 'ocean',
	height = '80vh',
	// loading = false,
	points = [],
	trackingInfo = [],
	currContainerDetails = {},
}) {
	const [currentRoute, setCurrentRoute] = useState([]);
	const { loading, allSeaRoute = [] } = useGetSeaRoute({ trackingInfo });

	useEffect(() => {
		if (!isEmpty(currContainerDetails)) {
			const currentTrackingInfo = allSeaRoute.filter(
				(info) => info?.containerNo === currContainerDetails?.container_no,
			);
			setCurrentRoute(currentTrackingInfo?.route);
		}
	}, [allSeaRoute, currContainerDetails]);

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
