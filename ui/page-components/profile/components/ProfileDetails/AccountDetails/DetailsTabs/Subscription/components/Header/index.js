import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

function Header({ activePlanObject = {}, activePlan = {} }) {
	const { price = '', currency = '' } = activePlanObject || {};
	const { display_name = '' } = activePlan || {};

	const { t } = useTranslation(['common']);

	return (
		<div className={styles.details_card}>

			<div className={styles.plan}>
				<div className={styles.current_plan}>{t('common:account_settings_subscription_text_5')}</div>
				<div className={styles.display_name}>{display_name}</div>
			</div>

			<div className={styles.plan}>
				<div className={styles.price}>
					<div className={styles.currency}>{currency}</div>
					<div className={styles.number}>{price}</div>
					<div className={styles.currency}>{t('common:account_settings_subscription_text_6')}</div>
				</div>
			</div>

		</div>
	);
}

export default Header;
