import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function CardLoader() {
	return (
		<div className={styles.container}>
			{[...Array(4)].map(() => (
				<div className={styles.section}>
					{[...Array(4)].map(() => (
						<Placeholder width="250px" height="20px" margin="10px" />
					))}
				</div>
			))}
		</div>
	);
}

export default CardLoader;
