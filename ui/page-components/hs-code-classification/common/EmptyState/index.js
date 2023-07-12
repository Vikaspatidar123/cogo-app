import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

import { Image } from '@/packages/next';

function EmptyState({ drillDwn }) {
	const { t } = useTranslation(['common', 'hsClassification']);

	return (
		<div className={drillDwn ? `${styles.drill_dwn}` : `${styles.container}`}>
			<Image
				src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/empty-Icon.svg"
				alt="Empty"
				width={180}
				height={180}
			/>
			<div className={`${styles.h1}`}>{t('hsClassification:hs_code_classification_empty_state_text_1')}</div>
			<div className={`${styles.h2}`}>{t('hsClassification:hs_code_classification_empty_state_text_2')}</div>
		</div>
	);
}

export default EmptyState;
