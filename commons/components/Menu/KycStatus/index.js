import CrossIcon from './crossIcon.svg';
import KycVerified from './kyc-verified.svg';
import PendingIcon from './pending-icon.svg';
import styles from './styles.module.css';

function KycStatus({ kyc_status, account_type }) {
	return (
		<div className={styles.container}>
			{kyc_status === 'verified' && (
				<>
					<div className={styles.kyc_verified}>Verified</div>
					<KycVerified width="10px" height="10px" />
				</>
			)}

			{kyc_status === 'rejected' && (
				<>
					<div className={styles.label}>KYC Rejected</div>
					<CrossIcon width="10px" height="10px" />
				</>
			)}

			{['pending_from_user', 'pending_verification'].includes(kyc_status) && (
				<>
					<div className={styles.kyc_pending}>KYC Pending</div>
					<PendingIcon width="10px" height="10px" />
				</>
			)}
		</div>
	);
}

export default KycStatus;
