import React from 'react';

import styles from './styles.module.css';

function EmptyState({ placement = 'center' }) {
	return (
		<div className={styles.container}>
			{placement === 'center' ? (
				<img
					height={300}
					width={300}
					alt=""
					src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/empty_icon 1.svg"
				/>
			) : null}
			<div className={styles.wrapper}>
				<div className={styles.heading}>Looks like you do not have any transactions with us</div>
				<div className={styles.content}>Try our products for hassle free shippings</div>
			</div>
		</div>
	);
}

EmptyState.propTypes = {};

export default EmptyState;
