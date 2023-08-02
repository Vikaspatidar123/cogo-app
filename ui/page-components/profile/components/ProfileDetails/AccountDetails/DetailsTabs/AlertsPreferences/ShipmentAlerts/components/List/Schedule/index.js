import { useTranslation } from 'next-i18next';

import Details from './Details';
import styles from './styles.module.css';

function Schedule({ props }) {
	const { t } = useTranslation(['settings']);

	return (
		<div className={styles.container}>
			<div className={styles.text}>{t('settings:schedule_alerts_text_1')}</div>
			<Details props={props} />
		</div>
	);
}

export default Schedule;
