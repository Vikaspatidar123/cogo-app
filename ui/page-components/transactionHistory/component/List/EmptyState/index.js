import React from 'react';

import Nodata from '../../../common/assets/nodata.svg';

import styles from './styles.module.css';

function EmptyState({ placement = 'center' }) {
	return (
		<div className={styles.container}>
			{placement === 'center' ? <Nodata width={300} height={300} /> : null}
			<div className={styles.wrapper}>
				<div className={styles.heading}>Looks like you do not have any transactions with us</div>
				<div className={styles.content}>Try our products for hassle free shippings</div>
			</div>
		</div>
	);
}

EmptyState.propTypes = {};

export default EmptyState;
