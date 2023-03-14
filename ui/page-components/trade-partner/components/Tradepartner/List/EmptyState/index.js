import React from 'react';

import styles from './styles.module.css';

function EmptyState({ placement = 'center' }) {
	return (
		<div className={styles.container}>
			{placement === 'center' ? (
				<img
					height={250}
					width={250}
					alt=""
					src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/empty_icon 1.svg"
				/>
			) : null}
			<div className={styles.wrapper}>
				<h4 className={styles.heading}>Looks like you do not have any trade partners</h4>
			</div>
		</div>
	);
}

EmptyState.propTypes = {};

export default EmptyState;
