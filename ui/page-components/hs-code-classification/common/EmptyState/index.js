import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

import { Image } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function EmptyState({ drillDwn }) {
	const { t } = useTranslation(['common', 'hsClassification']);

	return (
		<div className={drillDwn ? `${styles.drill_dwn}` : `${styles.container}`}>
			<Image
				src={GLOBAL_CONSTANTS.image_url.empty_state}
				alt={t('hsClassification:alt_text_for_empty_image')}
				width={300}
				height={200}
			/>
			<div className={styles.h1}>{t('hsClassification:hs_code_classification_empty_state_text_1')}</div>
			<div className={styles.h2}>{t('hsClassification:hs_code_classification_empty_state_text_2')}</div>
		</div>
	);
}

export default EmptyState;
