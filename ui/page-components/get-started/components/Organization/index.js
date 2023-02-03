import React from 'react';

import LeftPanel from '../../../common/LeftPanel';

import OrganizationForm from './OrganizationForm';
import styles from './styles.module.css';

function Organization({ setBillingAddressDetails }) {
	return (
		<div className={styles.right_container}>
			<div className={styles.header_container}>
				<div className={styles.header_container_bold}>Company Details</div>
				Please provide your company details.
			</div>
			<div className={styles.text_container}>
				If you are a Service Provider, kindly
				<a
					className={styles.text_container_span}
					href="https://partners.cogoport.com/en-IN/login/?redirectPath=%2Fapply%2F"
					target="_blank"
					rel="noreferrer"
				>
					click here
				</a>
				{' '}
				to sign up.
			</div>
			<div className={styles.organization_form_container}>
				<OrganizationForm setBillingAddressDetails={setBillingAddressDetails} />
			</div>
		</div>

	);
}

export default Organization;
