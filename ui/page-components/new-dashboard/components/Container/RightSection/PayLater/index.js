import { Button } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function PayLater() {
	const { push } = useRouter();
	const { t } = useTranslation(['dashboard']);

	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				{t('dashboard:pay_later_text_1')}
				{' '}
				<span className={styles.pay_text}>{t('dashboard:pay_later_text')}</span>
				{' '}
				{t('dashboard:pay_later_text_2')}
			</div>

			<div className={styles.des}>
				{t('dashboard:pay_later_text_3')}
			</div>

			<div className={styles.button}>
				<Button
					type="button"
					themeType="secondary"
					onClick={() => push('/pay-later')}
				>
					{t('dashboard:pay_later_text_4')}
				</Button>
			</div>
		</div>
	);
}
export default PayLater;
