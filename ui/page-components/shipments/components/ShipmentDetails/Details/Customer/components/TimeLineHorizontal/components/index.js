import { useContext } from 'react';

import { ShipmentDetailContext } from '../../../../../common/Context';

import MapAndDetails from './MapAndDetails';
import styles from './styles.module.css';

function TrackerInfomation({
	setQuickAction = () => {},
}) {
	const [{ shipment_data }] = useContext(ShipmentDetailContext);

	const servicesForMap = ['fcl_freight', 'air_freight'].includes(
		shipment_data?.shipment_type,
	);

	return (
		<div className={styles.container}>
			<MapAndDetails
				setQuickAction={setQuickAction}
				servicesForMap={servicesForMap}
			/>
		</div>
	);
}

export default TrackerInfomation;
