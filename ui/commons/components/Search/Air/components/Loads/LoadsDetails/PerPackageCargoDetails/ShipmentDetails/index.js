import React from 'react';

import styles from './styles.module.css';

function ShipmentDetails({
	packageQuantity = [],
	packageWeight = [],
	packageVolume = [],
}) {
	const roundUp = (i) => {
		const x = Math.round(i * 1000000) / 1000000;
		return x;
	};

	const getTotal = (arr) => {
		const total = arr.reduce((accumulator, value) => accumulator + value, 0);

		return roundUp(total);
	};

	return (
		<div className={styles.container}>
			<div className={styles.text}>
				{` Shipment total: ${getTotal(packageQuantity)} UNITS, ${getTotal(
					packageWeight,
				)} KG, ${getTotal(packageVolume)} CBM`}

			</div>
		</div>
	);
}

export default ShipmentDetails;
