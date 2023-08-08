import { IcCCogoCoin } from '@cogoport/icons-react';

import styles from './styles.module.css';

function CogoPoints({ rate }) {
	if (rate?.earnable_cogopoints > 0) {
		return (
			<div className={styles.container}>
				<div className={styles.label}>You will earn</div>
				<IcCCogoCoin style={{ wdith: 16, height: 16, margin: '0 4px' }} />
				<div className={styles.points}>{rate?.earnable_cogopoints}</div>
				<div className={styles.label}>CogoPoints</div>
			</div>
		);
	}

	return null;
}

export default CogoPoints;
