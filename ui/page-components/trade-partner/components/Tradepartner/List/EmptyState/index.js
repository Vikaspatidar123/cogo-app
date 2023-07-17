import { useTranslation } from 'next-i18next';
import React from 'react';

import styles from './styles.module.css';

import { Image } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function EmptyState({ placement = 'center' }) {
	const { t } = useTranslation(['common', 'tradePartner']);

	return (
		<div className={styles.container}>
			{placement === 'center' ? (
				<Image
					height={250}
					width={250}
					alt="icon"
					src={GLOBAL_CONSTANTS.image_url.no_schedules_found_image}
				/>
			) : null}
			<div className={styles.wrapper}>
				<h4 className={styles.heading}>{t('tradePartner:trade_partner_empty_list')}</h4>
			</div>
		</div>
	);
}

EmptyState.propTypes = {};

export default EmptyState;
