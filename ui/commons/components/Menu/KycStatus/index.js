import styles from './styles.module.css';

function KycStatus({ kyc_status }) {
	return (
		<div className={styles.container}>
			{kyc_status === 'verified' && (
				<>
					<div className={styles.kyc_verified}>Verified</div>
					<img src='https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/kyc-verifie.svg' alt='cogo' width="11px" height="11px" />
				</>
			)}

			{kyc_status === 'rejected' && (
				<>
					<div className={styles.label}>KYC Rejected</div>
					<img src='https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/crossIcon.svg' alt='cogo' width="11px" height="11px" />
				</>
			)}

			{['pending_from_user', 'pending_verification'].includes(kyc_status) && (
				<>
					<div className={styles.kyc_pending}>KYC Pending</div>
					<img src='https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/pending-ico.svg' alt='cogo' width="14px" height="14px" />
				</>
			)}
		</div>
	);
}

export default KycStatus;
