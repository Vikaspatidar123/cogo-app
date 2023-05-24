import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from '../components/styles.module.css';

function LoaderPage({ skeletonCount = 2 }) {
	return (
		<div className={styles.top_card}>
			{[...Array(skeletonCount)].map(() => (
				<div className={styles.cart}>
					{[...Array(4)].map(() => (
						<Placeholder margin="6px 0px" width="100%" />
					))}
				</div>
			))}
		</div>
	);
}
export default LoaderPage;
