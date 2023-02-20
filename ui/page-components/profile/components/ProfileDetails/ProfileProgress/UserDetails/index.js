import { Avatar } from '@cogoport/components';

import styles from './styles.module.css';

import { useSelector } from '@/packages/store';

function UserDetails() {
	const { profile } = useSelector((state) => state);
	const { organization = {} } = profile || {};
	const { kyc_status } = organization || {};

	return (
		<div className={styles.container}>
			<Avatar
				src="https://www.w3schools.com/howto/img_avatar.png"
				alt="img"
				disabled={false}
				size="48px"
			/>
			<div className={styles.details}>
				<div className={styles.sub_text}>
					<div className={styles.business_name}>{organization.business_name}</div>
				</div>
				<div className={styles.id}>
					<span className="kyc_status">
						{kyc_status === 'verified' && (
							<div className={styles.verified}>
								KYC Verified
								{/* <VerifiedIcon style={{ marginLeft: 4 }} /> */}
							</div>
						)}
						{kyc_status === 'rejected' && (
							<div className={styles.rejected}>
								KYC Rejected
								{/* <RejectedIcon style={{ marginLeft: 4 }} /> */}
							</div>
						)}

						{kyc_status.includes('pending') && (
							<div className={styles.pending}>
								KYC Pending
								{/* <PendingIcon style={{ marginLeft: 4 }} /> */}
							</div>
						)}
					</span>
				</div>
			</div>
		</div>
	);
}

export default UserDetails;
