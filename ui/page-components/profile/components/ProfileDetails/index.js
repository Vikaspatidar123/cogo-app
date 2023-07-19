import { useTranslation } from 'next-i18next';

import AccountDetails from './AccountDetails';
// import ProfileProgress from './ProfileProgress';
import styles from './styles.module.css';

function ProfileDetails() {
	const { t } = useTranslation(['settings']);

	return (
		<>
			{/* <ProfileProgress /> */}
			<div className={styles.heading}>{t('settings:account_settings_heading')}</div>
			<div className={styles.container}>
				<AccountDetails />
			</div>
		</>
	);
}
export default ProfileDetails;
