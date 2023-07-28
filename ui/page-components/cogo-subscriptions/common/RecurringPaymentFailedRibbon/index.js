import { IcMInfo } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

function RecurringPaymentFailedRibbon() {
	const { t } = useTranslation(['subscriptions']);

	return (
		<div className={styles.ribbon}>
			<div className={styles.icon}><IcMInfo width={15} height={15} /></div>
			<div className={styles.text_2}>{t('subscriptions:payment_failed_text')}</div>
			<div className={styles.text_3}>
				{t('subscriptions:attempt_number_failed_text')}
			</div>
		</div>
	);
}

export default RecurringPaymentFailedRibbon;
