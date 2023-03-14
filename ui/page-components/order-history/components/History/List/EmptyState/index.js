import React from 'react';

import styles from './styles.module.css';

function EmptyState() {
	return (
		<div className={styles.Container}>
			<div className={styles.wrapper}>
				<div className={styles.heading}>Looks like you do not have any orders</div>
			</div>
		</div>
	);
}

EmptyState.propTypes = {};

export default EmptyState;
