import React from 'react';

import Loader from './Loader';
import styles from './styles.module.css';

function Loading({ count = 3 }) {
	const list = [...Array(count)].map((v, i) => i + 1);

	return (
		<div>
			{list.map((item) => (
				<div className={styles.container} key={item}>
					<div className={styles.card}>
						<Loader />
					</div>
				</div>
			))}
		</div>
	);
}

export default Loading;
