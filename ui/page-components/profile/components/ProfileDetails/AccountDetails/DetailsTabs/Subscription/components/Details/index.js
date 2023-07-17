import { IcMFtick } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import formatDate from '@/ui/commons/utils/formatDate';

function Details({ activePlanObject = {} }) {
	const { start_date = '' } = activePlanObject || {};

	const { t } = useTranslation(['common']);

	return (
		<div className={styles.plan}>
			<div className={styles.status_card}>
				<div className={styles.current_plan}>{t('common:account_settings_subscription_status_text')}</div>
				<div className={styles.active}>
					<IcMFtick fill="#ABCD62" width={24} height={24} />
					<div className={styles.plan_name}>{t('common:account_settings_subscription_active_text')}</div>
				</div>
			</div>
			<div className={styles.date}>
				<div>{t('common:account_settings_subscription_text_2')}</div>
				<div className={styles.date_text}>
					{formatDate({
						date       : start_date,
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
						formatType : 'date',
					})}
				</div>
			</div>
		</div>
	);
}

export default Details;
