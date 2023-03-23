// import { startCase } from '@cogoport/front/utils';
// import React from 'react';

// import { Container, Pill, Text } from './styles';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function Status({ state }) {
	let statusText = startCase(state);
	if (state === 'init') {
		statusText = 'Not Allocated';
	}

	return (
		<div className={styles.container}>
			<div className={`${styles.state} ${styles.pill}`}>
				<div className={`${styles.state} ${styles.text}`}>{statusText}</div>
			</div>
		</div>
	);
}

export default Status;
