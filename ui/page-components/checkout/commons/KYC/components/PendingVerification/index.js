import KycSubmitted from '../../icons/kyc-submitted.svg';

import styles from './styles.module.css';

function PendingVerification() {
	return (
		<div className={styles.container}>
			<KycSubmitted style={{ width: 154, height: 120 }} />

			<div className={styles.content}>
				<div className={styles.heading}>KYC UNDER PROCESS!</div>
				<div className={styles.container}>
					The KYC details have been submitted successfully.
				</div>
			</div>
		</div>
	);
}

export default PendingVerification;
