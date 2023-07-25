import { isEmpty } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import useOceanRoute from '../hooks/useOceanRoute';

import EmptyState from './EmptyState';
import LoadingState from './LoadingState';
import MilestoneStepper from './MilestoneStepper';
import styles from './styles.module.css';
import TrackingMap from './TrackingMap';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import { mergeOceanMilestone, mergeAirMilestone } from '@/ui/page-components/air-ocean-tracking/utils/mergeMilestone';

function Body({ list = [], loading = false, shipmentType }) {
	const [oceanPoints, setOceanPoints] = useState([]);
	const [mapPoints, setMapPoints] = useState([]);

	const listToRender = list?.[GLOBAL_CONSTANTS.zeroth_index]?.data?.[GLOBAL_CONSTANTS.zeroth_index]?.tracking_data;

	const container_no = list?.[GLOBAL_CONSTANTS.zeroth_index]?.container_details?.map((c) => c?.container_no)
		.flat();
	const combineMileStoneList = shipmentType === 'ocean' ? mergeOceanMilestone(listToRender)
		: mergeAirMilestone(listToRender);

	const { routesLoading } = useOceanRoute({
		setMapPoints,
		container_no,
		saas_container_subscription_id : list?.[GLOBAL_CONSTANTS.zeroth_index]?.id,
		type                           : list?.[GLOBAL_CONSTANTS.zeroth_index]?.type,
	});

	useEffect(() => {
		if (mapPoints?.length) {
			setOceanPoints(
				mapPoints.find((x) => x.container_no === list?.[GLOBAL_CONSTANTS.zeroth_index]?.input)?.route,
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
