import { isEmpty } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import useOceanRoute from '../hooks/useOceanRoute';

import EmptyState from './EmptyState';
import LoadingState from './LoadingState';
import styles from './styles.module.css';
import TrackingData from './TrackingData';
import TrackingMap from './TrackingMap';

function Body({ list = [], loading = false }) {
	const [oceanPoints, setOceanPoints] = useState([]);
	const [mapPoints, setMapPoints] = useState([]);

	const listToRender = list?.[0]?.data?.[0]?.tracking_data;

	const container_no = list?.[0]?.container_details?.map((c) => c?.container_no)
		.flat();

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
				<div className={styles.container}>
					<LoadingState />
				</div>
			);
		}

		if (isEmpty(listToRender)) {
			return <EmptyState />;
		}

		return (
			<TrackingData
				data={listToRender}
				shippingLine={list?.[0]?.shipping_line}
			/>
		);
	};

	return (
		<div className={styles.tracking_info}>
			{renderComponent()}
			<TrackingMap
				routesLoading={routesLoading || loading}
				points={oceanPoints}
			/>
		</div>
	);
}

export default Body;
