import { IcMInformation } from '@cogoport/icons-react';

import styles from './styles.module.css';

function DetentionDemurrage() {
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h3>Setup detention / demurrage days</h3>
			</div>
			<div className={styles.notif}>
				<IcMInformation fill="#F68B21" width={20} height={20} />
				<div className={styles.notif_text}>
					Get alerted when detention / demurrage free days are about to expire, and when they expire.
				</div>
			</div>
			<div className={styles.form_container} />
		</div>
	);
}

export default DetentionDemurrage;
