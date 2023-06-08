import React from 'react';

import styles from './styles.module.css';

function EmptyState({ placement = 'center', message = '' }) {
	return (
		<div className={styles.container}>
			{placement === 'center'
			&& (
				<img
					src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/ic-empty-non-funded.svg"
					alt=""
					width={300}
					height={300}
				/>
			)}
			<div className={placement === 'side' ? styles.wrapper_side : styles.wrapper}>
				<div className={styles.content}>{message}</div>
			</div>
		</div>
	);
}

export default EmptyState;
