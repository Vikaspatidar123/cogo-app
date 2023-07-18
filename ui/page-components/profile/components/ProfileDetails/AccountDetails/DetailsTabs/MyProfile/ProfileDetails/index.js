import { Avatar, cl } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import BranchDetails from './BranchDetails';
import PersonalDetails from './PersonalDetails';
import styles from './styles.module.css';

import { useSelector } from '@/packages/store';

function ProfileDetails({ userDetails = {}, renderWorkScopes = () => {}, setShowPasswordModal = () => {} }) {
	const { t } = useTranslation(['settings']);

	const { profile } = useSelector((state) => state);
	const { organization = {} } = profile || {};
	const { kyc_status } = organization || {};

	return (
		<div className={styles.container}>
			<div className={styles.name_container}>
				<div>
					{userDetails.name
						? <Avatar personName={userDetails.name} size="50px" className={styles.avatar} />
						: (
							<Avatar
								src="https://www.w3schools.com/howto/img_avatar.png"
								alt="img"
								disabled={false}
								size="50px"
							/>
						)}
				</div>
				<div>
					<div className={styles.value_text}>{userDetails.name || '-'}</div>
					<div>
						{kyc_status === 'verified' && (
							<div className={cl`${styles.verified} ${styles.kyc_status}`}>
								{t('settings:settings_kyc_verified_text')}
							</div>
						)}
						{kyc_status === 'rejected' && (
							<div className={cl`${styles.rejected} ${styles.kyc_status}`}>
								{t('settings:settings_kyc_rejcted_text')}
							</div>
						)}
						{kyc_status?.includes('pending') && (
							<div className={cl`${styles.pending} ${styles.kyc_status}`}>
								{t('common:settings_kyc_pending_text')}
							</div>
						)}
					</div>
				</div>
			</div>
			<div className={styles.name_container}>
				<PersonalDetails
					userDetails={userDetails}
					renderWorkScopes={renderWorkScopes}
					setShowPasswordModal={setShowPasswordModal}
				/>
			</div>
			<div className={styles.name_container}>
				<BranchDetails userDetails={userDetails} />
			</div>
		</div>
	);
}

export default ProfileDetails;
