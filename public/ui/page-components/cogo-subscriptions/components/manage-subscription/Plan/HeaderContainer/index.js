import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

function HeaderContainer() {
	const { t } = useTranslation(['subscriptions']);

	return (
		<div className={styles.container}>
			<div>
				<span className={styles.one}>{t('subscriptions:heading_text')}</span>
			</div>

			<div className={styles.text}>
				{t('subscriptions:description1_text')}
				<div>{t('subscriptions:description2_text')}</div>
			</div>
		</div>
	);
}

export default HeaderContainer;
