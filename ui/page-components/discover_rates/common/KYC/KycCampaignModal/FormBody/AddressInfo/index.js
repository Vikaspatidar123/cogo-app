import React from 'react';

import styles from './styles.module.css';

function AddressInfo() {
	return (
		<div className={styles.container}>
			<div className={styles.info_container}>
				<p className={styles.heading}>
					Please upload one of the following. Documents should not be older than 6 months.
				</p>
				<div className={styles.points_body}>
					<ul>
						<li>Electricity Bill</li>
						<li>Water Bill</li>
						<li>Telephone Landline Bill</li>
						<li>Property Tax Receipt</li>
						<li>Current Registered Sale/ Lease/ Rent Agreement</li>
						<li>Gas Connection Bill</li>
						<li>Credit Card Statement</li>
					</ul>
				</div>
			</div>
		</div>
	);
}

export default AddressInfo;
