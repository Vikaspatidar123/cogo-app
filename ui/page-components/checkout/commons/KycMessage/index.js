import React, { useState } from 'react';

import KYC from '../../../../commons/components/KYC';

import styles from './styles.module.css';

function KycMessage({
	organization = {},
	getOrganizationAPI = {},
	refetchCheckout,
	importer_exporter_id,
	status,
}) {
	const [show, setShow] = useState(false);

	const onClose = () => {
		setShow(false);
		refetchCheckout();
		getOrganizationAPI.trigger({ params: { id: importer_exporter_id } });
	};

	return (
		<div>
			<KYC
				source="checkout"
				show={show}
				setShow={setShow}
				onClose={onClose}
				organizationData={organization}
			/>

			<div
				className={styles.flex}
			>
				<div className={styles.flex1}>
					<div style={{ display: 'flex', flexDirection: 'column' }}>
						<div className={styles.text}>KYC Verification Pending!</div>
						<div className={styles.text1}>
							Before you can book, we need some basic information about your
							company. Please complete KYC to proceed
						</div>
					</div>
				</div>
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<div
						role="presentation"
						className={styles.submit_btn}
						onClick={() => {
							setShow(true);
						}}
					>
						{status === 'rejected' ? 'RESUBMIT KYC' : 'Submit KYC'}
					</div>
				</div>
			</div>
		</div>
	);
}

export default KycMessage;
