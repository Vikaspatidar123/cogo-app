import { IcMPortArrow } from '@cogoport/icons-react';

import Item from './Item';
import styles from './styles.module.css';

function Coverage({ itemData }) {
	const {
		coverageTo = '',
		coverageFrom = '',
		destinationCountry = '',
		originCountry = '',
	} = itemData || {};

	const origin = {
		display_name : originCountry?.toUpperCase(),
		name         : coverageFrom?.toUpperCase(),
	};

	const destination = {
		display_name : destinationCountry?.toUpperCase(),
		name         : coverageTo?.toUpperCase(),
	};

	return (
		<div className={styles.container}>
			<div className={styles.col_1}>
				<Item location={origin} />
			</div>
			<div className={styles.col_2}>
				<IcMPortArrow size={1.1} />
			</div>
			<div className={styles.col}>
				<Item location={destination} />
			</div>
		</div>
	);
}
export default Coverage;
