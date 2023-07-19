import { Button } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

import { useRouter, Image } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function PayLaterWidgets() {
	const { push } = useRouter();
	const { t } = useTranslation(['dashboard']);

	return (
		<div className={styles.header}>
			<div className={styles.body}>
				{t('dashboard:pay_later_text_1')}
				<span className={styles.blue}>{t('dashboard:pay_later_text')}</span>
				{t('dashboard:pay_later_text_2')}
			</div>
			<div className={styles.mainBody}>
				<div className={styles.sub}>
					<Image
						className={styles.img}
						src={GLOBAL_CONSTANTS.image_url.pay_later_widget}
						alt="img"
						width={20}
						height={20}
					/>

				</div>
				<p className={styles.text}>
					{t('dashboard:pay_later_text_3')}
				</p>

			</div>
			<div className={styles.bottom}>
				<Button className={styles.button} type="button" onClick={() => push('/pay-later')}>
					{t('dashboard:pay_later_text_4')}
				</Button>
			</div>
		</div>
	);
}
export default PayLaterWidgets;
