/* eslint-disable no-undef */
import { deleteCookie } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import styles from '../styles.module.css';

function Logout() {
	const { t } = useTranslation(['common']);
	const handleClick = async (e) => {
		e.preventDefault();

		deleteCookie(process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME);

		window.location.href = '/login';
	};

	return (
		<div className={styles.logout_container}>
			<img
				src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/logoutIcon.svg"
				alt="cogo"
				style={{ marginRight: 12 }}
			/>

			<div
				className={styles.a_container}
				onClick={(e) => handleClick(e)}
				style={{ color: '#ef9b9b' }}
				role="presentation"
			>
				{t('common:layouts_app_logout')}

			</div>
		</div>
	);
}

export default Logout;
