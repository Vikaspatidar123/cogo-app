import React from 'react';

import { Intelligence } from './constant';
import styles from './styles.module.css';

function ContractIntelligence() {
	return (
		<div className={styles.card}>
			<div className={styles.title}>Lock price feature</div>
			{Intelligence.map(({ label, color }) => (
				<div className={styles.item}>
					<div className={styles.dot} style={{ backgroundColor: color }} />
					<div className={styles.label}>{label}</div>
				</div>
			))}
		</div>
	);
}

export default ContractIntelligence;
