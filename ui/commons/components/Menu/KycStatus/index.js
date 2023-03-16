import CrossIcon from './crossIcon.svg';
import KycVerified from './kyc-verified.svg';
import PendingIcon from './pending-icon.svg';
import styles from './styles.module.css';

function KycStatus({ kyc_status }) {
	return (
		<div className={styles.container}>
			{kyc_status === 'verified' && (
				<>
					<div className={styles.kyc_verified}>Verified</div>
					<KycVerified width="11px" height="11px" />
				</>
			)}

			{kyc_status === 'rejected' && (
				<>
					<div className={styles.label}>KYC Rejected</div>
					<CrossIcon width="11px" height="11px" />
				</>
			)}

			{['pending_from_user', 'pending_verification'].includes(kyc_status) && (
				<>
					<div className={styles.kyc_pending}>KYC Pending</div>
					<PendingIcon width="14px" height="14px" />
				</>
			)}
		</div>
	);
}

export default KycStatus;
