import styles from './styles.module.css';

import Table from '@/ui/page-components/air-ocean-tracking/common/Table';
import shipmentConfig from '@/ui/page-components/air-ocean-tracking/configuration/shipmentConfig';

function SelectShipment() {
	return (
		<div className={styles.container}>
			<Table title="Associated Shipments" data={{}} configs={shipmentConfig} />
		</div>
	);
}

export default SelectShipment;
