import React from 'react';

import styles from './styles.module.css';

function EmptyState({ placement = 'center' }) {
	return (
		<div className={styles.Container}>
			{/* {placement === 'center' ? <Nodata width={300} height={300} /> : null} */}
			<div className={styles.wrapper}>
				<div className={styles.heading}>Looks like you do not have any orders</div>
			</div>
		</div>
	);
}

EmptyState.propTypes = {};

export default EmptyState;
