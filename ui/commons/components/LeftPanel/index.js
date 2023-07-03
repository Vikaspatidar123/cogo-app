/* eslint-disable max-len */
import { useTranslation } from 'next-i18next';
import React from 'react';

import styles from './styles.module.css';

function LeftPanel() {
	const { t } = useTranslation(['common']);
	return (
		<div className={styles.left_container}>
			<div className={styles.cogo_icon_container}>
				<img
					width="150px"
					height="100px"
					src="https://cogoport-production.sgp1.digitaloceanspaces.com/e845419ea5eacebda858bad8b20d2797/cogoport-logo.svg"
					alt="Cogo"
				/>
			</div>

			<div className={styles.left_text_container}>
				<span className={styles.span}>{t('common:login_to_the')}</span>
				{t('common:cogoport_app_platform')}
				<div className={styles.left_text_subheader}>
					{t('common:deliver_value_to_your_customers')}
				</div>
			</div>
			<div className={styles.left_link_footer}>
				{t('common:need_any_help')}
				<a href="mailto:support@cogoport.com" className={styles.link_mail_text}>
					{t('common:support_email')}
				</a>
			</div>
		</div>
	);
}

export default LeftPanel;
