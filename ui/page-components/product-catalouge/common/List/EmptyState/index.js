import React from 'react';

import EmptyIcon from '../../../assets/ic-empty-non-funded.svg';

// import { Container, Content, Wrapper } from './styles';
import styles from './styles.module.css';

function EmptyState({ placement = 'center', message = '' }) {
	return (
		<div className={styles.container}>
			{placement === 'center' && <EmptyIcon width={300} height={300} />}
			<div className={placement === 'side' ? styles.wrapper_side : styles.wrapper}>
				<div className={styles.content}>{message}</div>
			</div>
		</div>
	);
}

EmptyState.propTypes = {};

export default EmptyState;
