import React from 'react';

import styles from './styles.module.css';

import { Image } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function EmptyTable() {
	return (
		<div className={styles.empty}>
			<Image
				src={GLOBAL_CONSTANTS.image_url.invoices_image}
				alt="invoice"
				width={140}
				height={140}
			/>
			<span>No Invoices Found</span>
		</div>
	);
}

export default EmptyTable;
