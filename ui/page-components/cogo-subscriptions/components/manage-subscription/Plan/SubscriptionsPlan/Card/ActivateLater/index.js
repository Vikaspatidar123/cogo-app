import { useTranslation } from 'next-i18next';
import React from 'react';

import {
	START_COUNT,
} from '../../../../../../constants/dimensions';
import styles from '../styles.module.css';

import { Image } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function ActivateLater({ activatesIn }) {
	const { t } = useTranslation(['subscriptions']);

	return (
		<div className={styles.date_box}>
			<Image
				src={GLOBAL_CONSTANTS.image_url.calendar_image}
				alt={t('subscriptions:cogo_text')}
				width={25}
				height={25}
			/>
			<span className={styles.days}>{activatesIn}</span>
			<span className={styles.date}>
				{activatesIn === START_COUNT
                	? t('subscriptions:day_text')
                	: t('subscriptions:days_text')}
				{' '}
				{t('subscriptions:left_activate_text')}
			</span>
		</div>
	);
}

export default ActivateLater;
