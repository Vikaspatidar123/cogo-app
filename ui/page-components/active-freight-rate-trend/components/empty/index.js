import React from 'react';

import styles from './styles.module.css';

function EmptyCard({ title, body }) {
	return (
		<div className={styles.card}>
			<div className={styles.container}>
				<div className={styles.heading}>
					<span>{title}</span>
					<div className={styles.body_text}>{body}</div>
				</div>
			</div>
		</div>
	);
}
export default EmptyCard;
