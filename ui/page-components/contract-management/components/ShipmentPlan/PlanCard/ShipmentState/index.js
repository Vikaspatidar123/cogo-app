import React from 'react';

import styles from './styles.module.css';
import Utilizations from './Utilisations';

function ShipmentState({ itemData }) {
	const { shipment_data } = itemData || {};
	const { ongoing = 0, completed = 0 } = shipment_data || {};

	const shipmentStat = [
		{
			label : 'Ongoing',
			count : ongoing,
		},
		{
			label : 'Completed',
			count : completed,
		},
	];

	return (
		<div className={styles.container}>
			{shipmentStat.map(({ label, count }) => (
				<div className={styles.card}>
					<div className={styles.label}>{label}</div>

					<div className={styles.sub_label}>
						{count}
						{' '}
						{count > 1 ? 'Shipments' : 'Shipment'}
					</div>
				</div>
			))}

			<div className={styles.utilization}>
				<Utilizations itemData={itemData} />
			</div>
		</div>
	);
}

export default ShipmentState;
