import { IcMTimer } from '@cogoport/icons-react';

import styles from './styles.module.css';

function RejectedApplication() {
	return (
		<div className={styles.container}>
			<div className={styles.rejected}>
				Application Rejected
			</div>
			<div className={styles.regret}>
				We regret to inform you that your application is rejected
			</div>
			<div className={styles.reapply}>
				<IcMTimer fill="black" />
				{' '}
				You can re apply for Pay Later after 3 Months
			</div>
		</div>
	);
}

export default RejectedApplication;
