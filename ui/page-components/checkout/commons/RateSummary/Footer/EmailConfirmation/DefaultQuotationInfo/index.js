import React from 'react';

import styles from './styles.module.css';

const DEFAULT_VALUE = 1;

function DefaultQuotationInfo() {
	return (
		<div className={styles.container}>
			<div className={styles.heading}>Included in Quotation</div>
			<div className={styles.items}>
				<div className={styles.value}>
					No of BL :
					{DEFAULT_VALUE}
				</div>
				<div className={styles.value}>
					BL Amendment:
					{DEFAULT_VALUE}
				</div>
				<div className={styles.value}>
					Booking Note:
					{DEFAULT_VALUE}
				</div>
			</div>
			<div className={styles.text}>
				Please be advised that any extra services required will be subject to
				additional charges.
			</div>
		</div>
	);
}

export default DefaultQuotationInfo;
