import { isEmpty } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import useOceanRoute from '../hooks/useOceanRoute';

import EmptyState from './EmptyState';
import LoadingState from './LoadingState';
import MilestoneStepper from './MilestoneStepper';
import styles from './styles.module.css';
import TrackingMap from './TrackingMap';

import { mergeOceanMilestone, mergeAirMilestone } from '@/ui/page-components/air-ocean-tracking/utils/mergeMilestone';

function Body({ list = [], loading = false, shipmentType }) {
	const [oceanPoints, setOceanPoints] = useState([]);
	const [mapPoints, setMapPoints] = useState([]);

	const listToRender = list?.[0]?.data?.[0]?.tracking_data;

	const container_no = list?.[0]?.container_details?.map((c) => c?.container_no)
		.flat();
	const combineMileStoneList = shipmentType === 'ocean' ? mergeOceanMilestone(listToRender)
		: mergeAirMilestone(listToRender);

	const { routesLoading } = useOceanRoute({
		setMapPoints,
		container_no,
		saas_container_subscription_id : list?.[0]?.id,
		type                           : list?.[0]?.type,
	});

	useEffect(() => {
		if (mapPoints?.length) {
			setOceanPoints(
				mapPoints.find((x) => x.container_no === list?.[0]?.input)?.route,
			);
		}
	}, [list, mapPoints]);

	const renderComponent = () => {
		if (loading) {
			return (
				<LoadingState type={shipmentType} />
			);
		}

		if (isEmpty(listToRender)) {
			return <EmptyState />;
		}

		return (
			<MilestoneStepper combineMileStoneList={combineMileStoneList} trackingType={shipmentType} />
		);
	};

	return (
		<div className={styles.tracking_info}>
			{renderComponent()}
			{!loading && (
				<TrackingMap
					routesLoading={routesLoading || loading}
					points={oceanPoints}
				/>
			)}
		</div>
	);
}

export default Body;
