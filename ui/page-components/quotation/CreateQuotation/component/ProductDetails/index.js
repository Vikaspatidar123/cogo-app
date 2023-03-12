import { Button } from '@cogoport/components';
import { IcMBreakBulkCargoType } from '@cogoport/icons-react';
import { forwardRef } from 'react';

import List from './List';
import styles from './styles.module.css';

function ProductDetails(props, ref) {
	return (
		<div className={styles.container}>
			<div className={styles.header_row}>
				<div className={styles.header}>
					<div className={styles.icon_container}>
						<IcMBreakBulkCargoType width={17} height={17} fill="#fff" />
					</div>
					<h3 className={styles.title}>Product Details</h3>
				</div>
				<Button themeType="secondary">Product Catalogue</Button>
			</div>
			<div>
				<List ref={ref} />
			</div>
		</div>
	);
}

export default forwardRef(ProductDetails);
