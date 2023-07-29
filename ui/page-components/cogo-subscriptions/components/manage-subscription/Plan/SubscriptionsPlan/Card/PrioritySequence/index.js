import { useTranslation } from 'next-i18next';
import React from 'react';

import {
	START_COUNT,
} from '../../../../../../constants/dimensions';
import styles from '../styles.module.css';

import { Image } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function PrioritySequence({ expiresIn }) {
	const { t } = useTranslation(['subscriptions']);

	return (
		<div className={styles.date_box}>
			<span className={styles.date}>{t('subscriptions:payment_due_text')}</span>
			<Image
				src={GLOBAL_CONSTANTS.image_url.calendar_image}
				alt={t('subscriptions:cogo_text')}
				width={25}
				height={25}
				className={styles.calender_image}
			/>
			<span className={expiresIn.length === 1 ? styles.days_1 : styles.days}>{expiresIn}</span>
			<span className={styles.date}>
				{expiresIn === START_COUNT
					? t('subscriptions:day_text')
					: t('subscriptions:days_text')}
				{' '}
			</span>

		</div>
	);
}

export default PrioritySequence;
