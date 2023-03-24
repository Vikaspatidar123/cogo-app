import KycCompletedIcon from '../../icons/kyc-completed.svg';

import styles from './styles.module.css';

function KycCompleted() {
	return (
		<div className={styles.main_container}>
			<div className={styles.container}>
				<KycCompletedIcon
					style={{ width: 145, height: 145, marginBottom: 24 }}
				/>
				<div className={styles.heading}>KYC Submission Completed!</div>
				<div className={styles.content}>
					Your information has been submitted with us. We will be finishing your
					KYC soon, after which you can search rates and book shipments from the
					platform.
				</div>
			</div>
		</div>
	);
}

export default KycCompleted;
