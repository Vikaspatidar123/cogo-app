import React from 'react';

import styles from './styles.module.css';

function DocInformation({ infoType }) {
	if (infoType === 'UDC') {
		return (
			<div className={styles.container}>
				<ul>
					<li>It is a one-time process.</li>
					<li>5 undated cheques (UDCs) are required.</li>
					<li>All 5 UDCs along with signed UDC agreement should be couriered to Cogoport’s address".</li>
					<li>Payee name: Cogoport Private Limited</li>
					<li>
						A line similar to
						"Amount not exceeding Seller’s limit in INR /5 " should be mentioned as per the sample UDC.
					</li>
				</ul>
			</div>
		);
	}
	if (infoType === 'PDC') {
		return 	(
			<div className={styles.container}>
				<ul>
					<li>It is a one-time process.</li>
					<li>5 undated cheques (UDCs) are required.</li>
					<li>All 5 UDCs along with signed UDC agreement should be couriered to Cogoport’s address".</li>
					<li>Payee name: Cogoport Private Limited</li>
					<li>
						A line similar to
						"Amount not exceeding Seller’s limit in INR /5 " should be mentioned as per the sample UDC.
					</li>
				</ul>
			</div>
		);
	}
}

export default DocInformation;
