import { useTranslation } from 'next-i18next';
import React from 'react';

import styles from './styles.module.css';

import { Image } from '@/packages/next';

function NoSchedulesCard({ loading }) {
	const { t } = useTranslation(['airSchedule']);
	return (
		!loading && (
			<div className={styles.card}>
				<Image
					alt="empty"
					src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/empty_icon 1.svg"
					height={200}
					width={300}
				/>
				{t('airSchedule:no_schedules_text')}
			</div>
		)

	);
}

export default NoSchedulesCard;
