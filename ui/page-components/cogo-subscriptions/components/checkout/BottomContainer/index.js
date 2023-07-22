import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function BottomContainer() {
	const { query } = useRouter();

	const { t } = useTranslation(['subscriptions']);

	const { period } = query || {};
	return (
		<div className={styles.bottom_container}>
			<div className={styles.text_1}>
				{t('subscriptions:recurring_communication_text_1')}
			</div>
			<div>
				{t('subscriptions:recurring_communication_text_2')}
				{' '}
				<strong>{period === 'annual' ? 'yearly' : period}</strong>
				{' '}
				{t('subscriptions:recurring_communication_text_3')}
			</div>
			<div>
				{t('subscriptions:recurring_communication_text_4')}
			</div>
		</div>
	);
}

export default BottomContainer;
