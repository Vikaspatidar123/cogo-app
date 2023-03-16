import React from 'react';

import styles from './styles.module.css';

function EmptyState({ heading = 'data', placement = 'center' }) {
	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<div className={placement}>
					<div className={styles.heading}>
						No
						{' '}
						{heading}
						{' '}
						found
					</div>
					<div className={styles.content}>
						Looks like you do not have any
						{' '}
						{heading}
						{' '}
						in this category
					</div>
				</div>
			</div>
			{placement === 'center' ? (
				<div className={styles.icontainer}>
					<img
						role="presentation"
						alt="img"
						src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/empty_new.svg"
						height="100%"
						width="100%"
						style={{ marginLeft: 12 }}
					/>
				</div>
			) : null}
		</div>
	);
}

EmptyState.propTypes = {};

export default EmptyState;
