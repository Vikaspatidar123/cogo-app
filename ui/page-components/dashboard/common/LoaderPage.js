import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from '../components/styles.module.css';

function LoaderPage({ skeletonCount = 2 }) {
	return (
		<div className={styles.top_card}>
			{[...Array(skeletonCount)].map(() => (
				<div className={styles.cart}>
					{[...Array(4)].map(() => (
						<Placeholder margin="10px 0px" width="100%" height="25px" />
					))}
				</div>
			))}
		</div>
	);
}
export default LoaderPage;
