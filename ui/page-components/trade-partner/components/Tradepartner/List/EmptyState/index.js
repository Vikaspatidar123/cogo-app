import { useTranslation } from 'next-i18next';
import React from 'react';

import styles from './styles.module.css';

function EmptyState({ placement = 'center' }) {
	const { t } = useTranslation(['tradePartner']);

	return (
		<div className={styles.container}>
			{placement === 'center' ? (
				<img
					height={250}
					width={250}
					alt=""
					src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/empty_icon 1.svg"
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
