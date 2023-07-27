import React from 'react';

import { getUnit } from '../../../../utils/getUnit';

import styles from './styles.module.css';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import formatDate from '@/ui/commons/utils/formatDate';

function ShipmentInfo({ serviceType = '', upcomingShipmentData = {} }) {
	const { start_date = '', quantity = 0 } = upcomingShipmentData || {};
	return (
		<div className={styles.container}>
			<div className={styles.note}>
				Upcoming Shipment:
				<span>
					{formatDate({
						date       : start_date,
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM'],
						formatType : 'date',
					})}

				</span>
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
