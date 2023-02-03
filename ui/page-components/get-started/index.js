import React from 'react';

import LeftPanel from '../common/LeftPanel';

import OrganizationForm from './components/OrganizationForm';
import styles from './styles.module.css';

function GetStarted() {
	return (
		<div className={styles.container}>
			<div className={styles.left_container}>
				<LeftPanel />
			</div>
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
				<div>
					<OrganizationForm />
				</div>
			</div>
		</div>
	);
}

export default GetStarted;
