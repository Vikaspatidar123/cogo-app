import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function CategoryLoader() {
	return (
		<div className={styles.container}>
			{[1, 2, 3, 4, 5, 6].map((ele) => (
				<div key={ele} className={styles.wrapper}>
					<Placeholder width="100%" height="100px" />
				</div>
			))}
		</div>
	);
}

export default CategoryLoader;
