// import React from 'react';

// import { Container, Content, Wrapper, EmptyCard } from './styles';
import styles from './styles.module.css';

function EmptyState({ containerHeight = '' }) {
	return (
		<div className={styles.empty_card}>
			<div className={styles.container}>
				<div className={`${styles.wrapper} ${containerHeight ? styles.wrapper_height : ''}`}>
					<img
						src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/empty-state.svg"
						alt=""
						className={styles.empty_state}
					/>
					<div className={styles.content}>No Data Found</div>
				</div>
			</div>
		</div>
	);
}

export default EmptyState;
