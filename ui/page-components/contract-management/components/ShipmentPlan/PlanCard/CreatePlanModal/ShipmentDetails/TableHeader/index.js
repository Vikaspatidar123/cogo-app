import React from 'react';

import styles from './styles.module.css';

import getShipmentHeaderControls from '@/ui/page-components/contract-management/configurations/shipment-header';
import getwidth from '@/ui/page-components/contract-management/utils/getWidth';

function TableHeader({ serviceType = '' }) {
	const headers = getShipmentHeaderControls({ serviceType });
	return (
		<div className={styles.container}>
			{(headers || []).map((item) => (
				<div className={`${styles.column_name}`} style={{ width: getwidth(item?.span) }}>
					{item.name}
				</div>
			))}
		</div>
	);
}

export default TableHeader;
