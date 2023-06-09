import { Chips } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

const OPTIONS = [
	{ children: 'Air International', key: 'air_international' },
	{ children: 'Air Domestic', key: 'air_domestic' },
];

function Header({
	serviceType = '',
	setServiceType = () => {},
	setOnServiceTypeClick = () => {},
}) {
	return (
		<div className={styles.container}>
			<div className={styles.service_type}>
				<Chips
					size="md"
					items={OPTIONS}
					selectedItems={serviceType}
					onItemChange={(value) => {
						setServiceType(value);
						if (serviceType !== value) {
							setOnServiceTypeClick(true);
						}
					}}
				/>
			</div>
		</div>
	);
}

export default Header;
