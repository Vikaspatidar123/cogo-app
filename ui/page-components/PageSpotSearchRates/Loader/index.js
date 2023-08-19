import React from 'react';

import styles from './styles.module.css';

function Loader({ isFull }) {
	return (
		<div className={`${styles.back_blur} ${isFull ? styles.full_screen : styles.half_screen}`}>
			<div className={styles.lds_ring}>
				<div />
				<div />
				<div />
				<div />
			</div>
		</div>
	);
}

export default Loader;
