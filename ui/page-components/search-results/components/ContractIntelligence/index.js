import React from 'react';

import { Intelligence } from '../../constants';

import styles from './styles.module.css';

function ContractIntelligence() {
	return (
		<div className={styles.card}>
			<div className={styles.title}>Lock price feature</div>
			{Intelligence.map(({ label, color }) => (
				<div className={styles.item}>
					<div className={styles.dot}>
						{color ? <div style={{ backgroundColor: `${color}` }} />
							: <div style={{ backgroundColor: '#8cc1f9' }} />}
						<div className={styles.label}>{label}</div>
					</div>
				</div>
			))}
		</div>
	);
}

export default ContractIntelligence;
