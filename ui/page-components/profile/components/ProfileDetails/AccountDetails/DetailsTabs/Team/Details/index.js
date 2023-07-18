import { cl } from '@cogoport/components';

import styles from './styles.module.css';

import { useSelector } from '@/packages/store';

function Details({ users = [] }) {
	const { profile } = useSelector((state) => state);
	const { organization = {} } = profile || {};
	const { kyc_status } = organization || {};

	return (
		<div>
			<div className={styles.name_container}>
				<div className={styles.value_text_2}>{profile.name || '-'}</div>
				<div>
					{kyc_status === 'verified' && (
						<div className={cl`${styles.verified} ${styles.kyc_status}`}>
							KYC Verified
						</div>
					)}
					{kyc_status === 'rejected' && (
						<div className={cl`${styles.rejected} ${styles.kyc_status}`}>
							KYC Rejected
						</div>
					)}
					{kyc_status?.includes('pending') && (
						<div className={cl`${styles.pending} ${styles.kyc_status}`}>
							KYC Pending
						</div>
					)}
				</div>
			</div>
			<div className={styles.name_container}>
				<div className={styles.header_text}>
					Team Members (
					{users.length > 0 ? users.length : ''}
					)
				</div>

				{(users || []).map((user) => (
					<div className={styles.container}>
						<div className={styles.sub_container}>
							<div className={styles.value_text}>
								Username
							</div>
							<div className={styles.label_text}>
								{user?.name || '-'}
							</div>
						</div>

						<div className={styles.sub_container}>
							<div className={styles.value_text}>
								Email
								{' '}
							</div>
							<div className={styles.label_text}>
								{user?.email || '-'}
							</div>
						</div>

						<div className={styles.sub_container}>
							<div className={styles.value_text}>
								Mobile Number
							</div>
							<div className={styles.label_text}>
								{user?.mobile_number
									? `${user?.mobile_country_code || ''} ${
										user?.mobile_number
									}`
									: '-'}
							</div>
						</div>

						<div className={styles.sub_container}>
							<div className={styles.value_text}>
								Status
							</div>
							<div className={styles.label_text}>
								{user.status || '-'}
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default Details;
