import { useTranslation } from 'next-i18next';
import React from 'react';

import styles from './styles.module.css';

import { Image } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function EmptyState() {
	const { t } = useTranslation(['orderHistory']);
	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<Image
					src={GLOBAL_CONSTANTS.image_url.empty_state}
					height={350}
					width={350}
					alt={t('orderHistory:empty_state_2')}
				/>
				<div className={styles.heading}>{t('orderHistory:empty_state_1')}</div>
			</div>
		</div>
	);
}

EmptyState.propTypes = {};

export default EmptyState;
