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
					// eslint-disable-next-line max-len
					src="https://cogoport-production.sgp1.digitaloceanspaces.com/51bdc5a625c9c78b9d3ee7a53c399dc7/3973480%201.svg"
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
