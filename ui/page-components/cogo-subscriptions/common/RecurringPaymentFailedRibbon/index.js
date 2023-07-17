import { IcMInfo } from '@cogoport/icons-react';

import styles from './styles.module.css';

function RecurringPaymentFailedRibbon() {
	return (
		<div className={styles.ribbon}>
			<div className={styles.icon}><IcMInfo width={15} height={15} /></div>
			<div className={styles.text_2}>Payment Failed</div>
			<div className={styles.text_3}>
				Our last attempted charge was unsuccessful.
				Your subscription will be automatically cancelled after 3 failed attempts.
				Contact admin to update payment.
			</div>
		</div>
	);
}

export default RecurringPaymentFailedRibbon;
