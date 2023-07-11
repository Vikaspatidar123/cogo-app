import { cl } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

function Head({ check }) {
	const { t } = useTranslation(['subscriptions']);

	const SORTED_PlAN = [
		t('subscriptions:starter_text'),
		t('subscriptions:standard_text'),
		t('subscriptions:premium_text'),
	];

	return (
		<div className={cl`${styles.container} ${check && styles.check}`}>
			<div className={cl`${styles.col} ${styles.feature} ${styles.featureTitle}`} width="30%" />
			<div className={styles.plan_name}>
				{(SORTED_PlAN || []).map((display_name) => (
					<div className={cl`${styles.col} ${styles.text}`} key={display_name}>
						{display_name}
					</div>
				))}
			</div>
		</div>
	);
}
export default Head;
