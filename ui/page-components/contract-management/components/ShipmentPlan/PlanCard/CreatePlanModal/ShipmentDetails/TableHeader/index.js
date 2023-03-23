import React from 'react';

import styles from './styles.module.css';

import ShipmentHeader from '@/ui/page-components/contract-management/configurations/shipment-header';

function TableHeader({ serviceType = '' }) {
	const headers = ShipmentHeader({ serviceType });
	return (
		<div className={styles.container}>
			{(headers || []).map((item) => (
				<div className={`${styles.column_name}`}>
					{item.name}
				</div>
			))}
		</div>
	);
}

export default TableHeader;
