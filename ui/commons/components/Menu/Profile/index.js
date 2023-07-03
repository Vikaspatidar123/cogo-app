import { IcMAccountSettings } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import styles from '../styles.module.css';

import { useRouter } from '@/packages/next';

function Profile({ setShowPopover = () => { } }) {
	const { t } = useTranslation(['common']);
	const router = useRouter();

	const handleClick = async () => {
		router.push('/settings', '/settings', true);

		setShowPopover(false);
	};

	return (
		<div className={styles.account_settings}>
			<IcMAccountSettings width={20} height={20} style={{ marginRight: '12px' }} />

			<div
				className={styles.a_container}
				onClick={(e) => handleClick(e)}
				role="presentation"
			>
				{t('common:layouts_app_settings')}
			</div>
		</div>
	);
}

export default Profile;
