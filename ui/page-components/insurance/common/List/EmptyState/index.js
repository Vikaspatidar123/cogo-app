import React from 'react';

import styles from './styles.module.css';

function EmptyState({ placement = 'center' }) {
	return (
		<div className={styles.container}>
			{placement === 'center' ? (
				<img
					src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/startpage.svg"
					alt=""
					width={300}
					height={300}
				/>
			) : null}
			<div className={styles.wrapper}>
				<div className={styles.content}>Looks like you do not have any insurance</div>
				<div className={styles.heading}>Try creating an insurance to secure your cargo</div>
			</div>
		</div>
	);
}

EmptyState.propTypes = {};

export default EmptyState;
