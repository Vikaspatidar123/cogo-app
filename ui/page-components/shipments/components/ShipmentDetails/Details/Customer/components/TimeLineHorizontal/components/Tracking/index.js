import React, { useState, useContext } from 'react';

import { ShipmentDetailContext } from '../../../../../../common/Context';

import Body from './Body';
import Header from './Header';
import useGetSaasContainerSubscription from './hooks/useGetSaasContainerSubscription';
import styles from './styles.module.css';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const SHIPMENT_TYPE_MAPPING = {
	fcl_freight : 'ocean',
	air_freight : 'air',
};
function Tracking() {
	const [{ shipment_data: shipmentData }] = useContext(ShipmentDetailContext);
	const [containerNo, setContainerNo] = useState('');

	const { loading, data: list } = useGetSaasContainerSubscription({
		shipmentId: shipmentData?.id,
	});

	const shipmentType = SHIPMENT_TYPE_MAPPING[shipmentData?.shipment_type] || 'ocean';

	const containerOptions = Array.isArray(list)
		? (list || [])
			.filter((e) => e?.type === 'CONTAINER_NO')
			?.map((e) => ({ label: e?.input, value: e?.input }))
		: [];

	const trackingData = Array.isArray(list)
		? (list || []).filter(
			(e) => e?.input === (containerNo || containerOptions?.[GLOBAL_CONSTANTS.zeroth_index]?.value),
		)
		: [];

	return (
		<div className={styles.container}>
			<Header
				containerOptions={containerOptions}
				setContainerNo={setContainerNo}
				containerNo={containerNo || containerOptions?.[GLOBAL_CONSTANTS.zeroth_index]?.value}
				shipmentId={shipmentData?.id}
			/>
			<Body list={trackingData} loading={loading} shipmentType={shipmentType} />
		</div>
	);
}

export default Tracking;
