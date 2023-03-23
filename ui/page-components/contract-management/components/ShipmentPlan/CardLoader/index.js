import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function CardLoader() {
	return (
		<div className={styles.container}>
			{[...Array(4)].map(() => (
				<div className={styles.section}>
					{[...Array(4)].map(() => <Placeholder />)}
				</div>
			))}
		</div>
	);
}

export default CardLoader;
