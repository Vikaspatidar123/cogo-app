import React from 'react';

import styles from './styles.module.css';

function EmptyState({ placement = 'center' }) {
	return (
		<div className={styles.container}>
			{placement === 'center' ? (
				<img
					height={400}
					width={400}
					alt=""
					src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/empty_icon 1.svg"
				/>
			) : null}
		</div>
	);
}

EmptyState.propTypes = {};

export default EmptyState;
