import { Button } from '@cogoport/components';
import React from 'react';

import OrganizationForm from './OrganizationForm';
import styles from './styles.module.css';

import { useSelector } from '@/packages/store';

function Organization({ setBillingAddressDetails, setOrgId, setOrgBranchId }) {
	const handleBack = () => {
		// eslint-disable-next-line no-undef
		window.location.href = '/';
	};
	const { organizations } = useSelector(({ profile }) => profile);
	const checkPoint = organizations.length > 0;
	return (
		<div className={styles.right_container}>
			<div className={styles.header_container}>
				<div className={styles.header_container_bold}>Company Details</div>
				Please provide your company details.
				{checkPoint && (
					<Button
						size="md"
						themeType="accent"
						className={styles.button}
						onClick={handleBack}
					>
						GO TO DASHBOARD
					</Button>
				)}
			</div>

			<div className={styles.text_container}>
				If you are a Service Provider, kindly
				<a
					className={styles.text_container_span}
					href="https://app.cogoport.com/login/?redirectPath=%2Fapply%2F"
					target="_blank"
					rel="noreferrer"
				>
					click here
				</a>
				{' '}
				to sign up.
			</div>
			<div className={styles.organization_form_container}>
				<OrganizationForm
					setBillingAddressDetails={setBillingAddressDetails}
					setOrgId={setOrgId}
					setOrgBranchId={setOrgBranchId}
				/>
			</div>
		</div>
	);
}

export default Organization;
