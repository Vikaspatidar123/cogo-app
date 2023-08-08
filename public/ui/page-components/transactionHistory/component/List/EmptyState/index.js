import { useTranslation } from 'next-i18next';
import React from 'react';

import styles from './styles.module.css';

import { Image } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function EmptyState({ placement = 'center' }) {
	const { t } = useTranslation(['transactionHistory']);
	return (
		<div className={styles.container}>
			{placement === 'center' ? (
				<Image
					height={300}
					width={300}
					alt={t('transactionHistory:empty_state_text_1')}
					src={GLOBAL_CONSTANTS.image_url.empty_state}
				/>
			) : null}
			<div className={styles.wrapper}>
				<div className={styles.heading}>{t('transactionHistory:empty_state_text_1')}</div>
				<div className={styles.content}>{t('transactionHistory:empty_state_text_2')}</div>
			</div>
		</div>
	);
}

EmptyState.propTypes = {};

export default EmptyState;
