import React from 'react';

import styles from './styles.module.css';

import { Image } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function EmptyState({ containerHeight = '' }) {
	return (
		<div className={styles.empty_card}>
			<div className={styles.container}>
				<div className={styles.wrapper} style={{ height: `${containerHeight}:360px` }}>
					<Image
						src={GLOBAL_CONSTANTS.image_url.empty_url}
						height={100}
						width={100}
						alt="empty item"
					/>
					<p className={styles.content}>No Data Found</p>
				</div>
			</div>
		</div>
	);
}

export default EmptyState;
