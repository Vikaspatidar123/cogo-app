import React, { useState } from 'react';

import LeftPanel from '../common/LeftPanel';

import BillingAddress from './components/BillingAddress';
import Organization from './components/Organization';
import styles from './styles.module.css';

function GetStarted() {
	const [billingAddressDetails, setBillingAddressDetails] = useState(false);

	return (
		<div className={styles.container}>
			<div className={styles.left_container}>
				<LeftPanel />
			</div>
			<div className={styles.right_container}>
				{billingAddressDetails && (
					<Organization
						setBillingAddressDetails={setBillingAddressDetails}
					/>
				)}
				{!billingAddressDetails && <BillingAddress />}
			</div>
		</div>
	);
}

export default GetStarted;
