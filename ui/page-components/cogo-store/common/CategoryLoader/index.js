import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function CategoryLoader() {
	return (
		<div className={styles.container}>
			{[...Array(6).keys()].map((ele) => (
				<div key={ele} className={styles.wrapper}>
					<Placeholder width="100%" height="100px" />
				</div>
			))}
		</div>
	);
}

export default CategoryLoader;
