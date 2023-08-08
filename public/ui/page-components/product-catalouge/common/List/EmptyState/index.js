import React from 'react';

import styles from './styles.module.css';

import { Image } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function EmptyState({ placement = 'center', message = '' }) {
	return (
		<div className={styles.container}>
			{placement === 'center'
			&& (
				<Image
					src={GLOBAL_CONSTANTS.image_url.empty_state}
					alt="empty"
					width={300}
					height={300}
				/>
			)}
			<div className={placement === 'side' ? styles.wrapper_side : styles.wrapper}>
				<div className={styles.content}>{message}</div>
			</div>
		</div>
	);
}

export default EmptyState;
