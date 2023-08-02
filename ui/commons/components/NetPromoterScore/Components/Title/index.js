import { IcCStar } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

import { Image } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function Title() {
	const { t } = useTranslation(['common']);

	return (
		<div className={styles.container}>
			<div>
				<div className={styles.title}>
					<IcCStar width={20} height={20} />
					<div className={styles.title_text}>{t('common:net_promoter_score_text_1')}</div>
				</div>

				<div className={styles.text_1}>{t('common:net_promoter_score_text_2')}</div>

				<div className={styles.text_2}>
					{t('common:net_promoter_score_text_3')}
					{' '}
					<span className={styles.text_3}>{t('common:net_promoter_score_text_4')}</span>
				</div>
			</div>

			<div>
				<Image
					src={GLOBAL_CONSTANTS.image_url.cogoport_water_mark}
					width={100}
					height={130}
					alt={t('common:logo')}
				/>
			</div>
		</div>
	);
}

export default Title;
