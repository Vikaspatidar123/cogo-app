import React from 'react';

import styles from './styles.module.css';

function QuickActions({
	setQuickAction = () => {},
	servicesForMap = false,
}) {
	return (
		<div className={`${styles.container} ${!servicesForMap ? styles.app_quick_action : ''}`}>
			<div className={styles.row}>
				<img
					src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/ic-light-bolt.svg"
					alt="thunder"
				/>
				<div className={styles.header}>Quick Actions</div>
			</div>

			<div role="presentation" className={styles.custom_button} onClick={() => setQuickAction('services')}>
				Add Service
			</div>

			<div
				role="presentation"
				className={`${styles.custom_button} ${styles.sop}`}
				onClick={() => setQuickAction('sop_poc')}
			>
				Add SOP
			</div>
		</div>
	);
}

export default QuickActions;
