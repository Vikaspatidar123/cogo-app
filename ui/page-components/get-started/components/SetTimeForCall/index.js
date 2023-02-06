import { IcCFtick } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function SetTimeForCall() {
	return (
		<div>
			<div className={styles.header_container}>
				<span className={styles.header_container_bold}>Account Created</span>
				Your Cogoport Account has been set up.
			</div>
			<div className={styles.icon_container}>
				<IcCFtick width="120px" height="120px" />
			</div>
			<div className={styles.text}>
				An agent might reach out to you over phone for business verification.
			</div>
			<div className={styles.text}>
				Please select your preferred time slot in a day when you are available for a call.
			</div>
		</div>
	);
}

export default SetTimeForCall;
