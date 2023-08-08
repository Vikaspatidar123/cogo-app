import { useTranslation } from 'next-i18next';
import React from 'react';

import styles from './styles.module.css';

import { Image } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function NoSchedulesCard({ loading }) {
	const { t } = useTranslation(['oceanSchedule']);
	return (
		!loading && (
			<div className={styles.card}>
				<Image
					alt="No Data Found"
					src={GLOBAL_CONSTANTS.image_url.no_schedules_found_image}
					height={200}
					width={300}
				/>
				{t('oceanSchedule:no_schedules_found_text')}
			</div>
		)
	);
}

export default NoSchedulesCard;
