import { useTranslation } from 'next-i18next';
import React from 'react';

import styles from './styles.module.css';

function EmptyState({ heading = 'data', placement = 'center' }) {
	const { t } = useTranslation(['common', 'hsClassification']);
	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<div className={placement}>
					<div className={styles.heading}>
						{t('hsClassification:hs_code_classification_empty_state_text_3')}
						{heading}
						{t('hsClassification:hs_code_classification_empty_state_text_6')}
					</div>
					<div className={styles.content}>
						{t('hsClassification:hs_code_classification_empty_state_text_4')}
						{heading}
						{t('hsClassification:hs_code_classification_empty_state_text_5')}
					</div>
				</div>
			</div>
			{placement === 'center' ? (
				<div className={styles.icontainer}>
					<img
						role="presentation"
						alt="img"
						src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/empty_new.svg"
						height="100%"
						width="100%"
						style={{ marginLeft: 12 }}
					/>
				</div>
			) : null}
		</div>
	);
}

EmptyState.propTypes = {};

export default EmptyState;
