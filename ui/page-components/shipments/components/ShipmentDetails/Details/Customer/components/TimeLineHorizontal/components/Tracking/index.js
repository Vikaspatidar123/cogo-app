import React, { useState, useContext } from 'react';

import { ShipmentDetailContext } from '../../../../../../common/Context';

import Body from './Body';
import Header from './Header';
import useGetSaasContainerSubscription from './hooks/useGetSaasContainerSubscription';
import styles from './styles.module.css';

const shipmentTypeMapping = {
	fcl_freight : 'ocean',
	air_freight : 'air',
};
function Tracking() {
	const [{ shipment_data: shipmentData }] = useContext(ShipmentDetailContext);
	const [containerNo, setContainerNo] = useState('');

	const { loading, data: list } = useGetSaasContainerSubscription({
		shipmentId: shipmentData?.id,
	});
	const shipmentType = shipmentTypeMapping[shipmentData?.shipment_type] || 'ocean';
	const ContainerOptions = Array.isArray(list)
		? (list || [])
			.filter((e) => e?.type === 'CONTAINER_NO')
			?.map((e) => ({ label: e?.input, value: e?.input }))
		: [];

	const trackingData = Array.isArray(list)
		? (list || []).filter(
			(e) => e?.input === (containerNo || ContainerOptions?.[0]?.value),
		)
		: [];

	return (
		<div className={styles.container}>
			<Header
				ContainerOptions={ContainerOptions}
				setContainerNo={setContainerNo}
				containerNo={containerNo || ContainerOptions?.[0]?.value}
				shipmentId={shipmentData?.id}
			/>
			<Body list={trackingData} loading={loading} shipmentType={shipmentType} />
		</div>
	);
}

export default Tracking;
