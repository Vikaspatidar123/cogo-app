import { Avatar, cl } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

import { useSelector } from '@/packages/store';

function UserDetails() {
	const { t } = useTranslation(['settings']);

	const { profile } = useSelector((state) => state);
	const { organization = {} } = profile || {};
	const { kyc_status } = organization || {};

	const KYC_MAPPING = {
		verified : t('settings:settings_kyc_verified_text'),
		rejected : t('settings:settings_kyc_rejcted_text'),
		pending  : t('settings:settings_kyc_pending_text'),
	};

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
						<div>
							{['verified', 'rejected', 'pending'].includes(kyc_status)
								? (
									<div className={cl`${styles[`${kyc_status}`]} ${styles.kyc_status}`}>
										{KYC_MAPPING.kyc_status}
									</div>
								) : null}
						</div>
					</span>
				</div>
			</div>
		</div>
	);
}

export default UserDetails;
