import React from 'react';

import styles from './styles.module.css';

function EmptyState() {
	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<img
					height={350}
					width={350}
					alt=""
					src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/empty_icon 1.svg"
				/>
				<div className={styles.heading}>Looks like you do not have any orders</div>
			</div>
		</div>
	);
}

EmptyState.propTypes = {};

export default EmptyState;
