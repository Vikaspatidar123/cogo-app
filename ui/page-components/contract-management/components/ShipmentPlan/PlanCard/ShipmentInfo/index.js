import { format } from '@cogoport/utils';
import React from 'react';

import { getUnit } from '../../../../utils/getUnit';

import styles from './styles.module.css';

function ShipmentInfo({ serviceType = '', upcomingShipmentData = {} }) {
	const { start_date = '', quantity = 0 } = upcomingShipmentData || {};
	return (
		<div className={styles.container}>
			<div className={styles.note}>
				Upcoming Shipment:
				<span>{format(start_date, 'dd MMM')}</span>
			</div>
			<div className={styles.count}>
				{quantity}
				<span>
					{' '}
					{getUnit(serviceType)}
				</span>
			</div>
		</div>
	);
}

export default ShipmentInfo;
