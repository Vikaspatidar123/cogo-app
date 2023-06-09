import { IcCFtick, IcCFcrossInCircle, IcCError } from '@cogoport/icons-react';

import styles from './styles.module.css';

function KycStatus({ kyc_status }) {
	return (
		<div className={styles.container}>
			{kyc_status === 'verified' && (
				<>
					<div className={styles.kyc_verified}>Verified</div>
					<IcCFtick width={15} height={15} />
				</>
			)}

			{kyc_status === 'rejected' && (
				<>
					<div className={styles.label}>KYC Rejected</div>
					<IcCFcrossInCircle width={15} height={15} />
				</>
			)}

			{['pending_from_user', 'pending_verification'].includes(kyc_status) && (
				<>
					<div className={styles.kyc_pending}>KYC Pending</div>
					<IcCError width={15} height={15} />
				</>
			)}
		</div>
	);
}

export default KycStatus;
