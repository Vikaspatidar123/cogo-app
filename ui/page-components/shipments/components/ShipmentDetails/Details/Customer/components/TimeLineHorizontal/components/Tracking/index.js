import React, { useContext } from 'react';

import { ShipmentDetailContext } from '../../../../../../common/Context';

import Body from './Body';
import useGetSaasContainerSubscription from './hooks/useGetSaasContainerSubscription';
import styles from './styles.module.css';

function Tracking() {
	const [{ shipment_data: shipmentData }] = useContext(ShipmentDetailContext);

	const { loading, data: list } = useGetSaasContainerSubscription({
		shipmentId: shipmentData?.id,
	});

	const ContainerOptions = Array.isArray(list)
		? (list || [])
			.filter((e) => e?.type === 'CONTAINER_NO')
			?.map((e) => ({ label: e?.input, value: e?.input }))
		: [];

	const trackingData = Array.isArray(list)
		? (list || []).filter(
			(e) => e?.input === (ContainerOptions?.[0]?.value),
		)
		: [];

	return (
		<div className={styles.container}>
			<Body list={trackingData} loading={loading} />
		</div>
	);
}

export default Tracking;
