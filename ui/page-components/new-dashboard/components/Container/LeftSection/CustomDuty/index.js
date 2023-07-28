import { Button } from '@cogoport/components';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function CustomDuty() {
	const { push } = useRouter();

	const { t } = useTranslation(['dashboard']);

	return (
		<div
			className={styles.container}
			style={{
				backgroundImage: `url(${GLOBAL_CONSTANTS.image_url.duty_image})`,
			}}
		>
			<div className={styles.text}>{t('dashboard:custom_duty_text1')}</div>
			<div className={styles.seaction}>
				<div>
					<div className={styles.des}>
						{t('dashboard:custom_duty_text2')}
					</div>
					<div className={styles.text_des}>
						{t('dashboard:custom_duty_text3')}
					</div>
					<div className={styles.button}>
						<Button
							themeType="accent"
							type="button"
							onClick={() => push('/saas/premium-services/duties-taxes-calculator')}
						>
							{t('dashboard:custom_duty_text4')}

						</Button>
					</div>

				</div>

				<div className={styles.img_container}>
					<Image
						width={200}
						height={200}
						src={GLOBAL_CONSTANTS.image_url.custom_duty}
						alt={t('dashboard:cogo_logo')}
					/>
				</div>
			</div>
		</div>
	);
}
export default CustomDuty;
