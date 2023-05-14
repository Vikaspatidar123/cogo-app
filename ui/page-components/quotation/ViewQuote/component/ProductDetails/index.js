import { cl } from '@cogoport/components';

import styles from './styles.module.css';

import { shortFormatNumber } from '@/ui/commons/utils/getShortFormatNumber';

// const config = [
// 	{
// 		key   : 'name',
// 		title : 'Name',
// 	},
// 	{
// 		key   : 'description',
// 		title : 'Description',
// 		width : '180px',
// 	},
// 	{
// 		key   : 'hsCode',
// 		title : 'HS Code',
// 		width : '80px',
// 	},
// 	{
// 		key   : 'quantity',
// 		title : 'Quantity',
// 		width : '70px',
// 	},
// 	{
// 		key   : 'name',
// 		title : 'Selling Price',
// 	},
// 	{
// 		key   : 'name',
// 		title : 'Total Price',
// 	},
// ];

function ProductDetails({ products = [], currency }) {
	const productsLength = products?.length;
	return (
		<div className={styles.container}>
			<h2 className={styles.title}>Product Details</h2>
			<div className={styles.scroll_container}>
				<div className={cl`${styles.row} ${styles.cardheader}`}>
					<div className={styles.col}>Name</div>
					<div className={styles.col} style={{ width: '180px' }}>Description</div>
					<div className={styles.col} style={{ width: '80px' }}>HS Code</div>
					<div className={styles.col} style={{ width: '70px' }}>Quantity</div>
					<div className={styles.col}>Selling Price</div>
					<div className={styles.col}>Total Price</div>
				</div>
				{(products || []).map((product, index) => (
					<div
						className={cl`${styles.row} ${styles.tbody}
					${index % 2 === 0 ? styles.row_bg : ''} ${index === productsLength - 1 ? styles.last_row : ''}`}
						key={product?.productId}
					>
						<div className={styles.col}>{product?.name}</div>
						<div className={styles.col} style={{ width: '180px' }}>{product?.description || '--'}</div>
						<div className={styles.col} style={{ width: '80px' }}>{product?.hsCode}</div>
						<div className={styles.col} style={{ width: '70px' }}>{product?.quantity}</div>
						<div className={styles.col}>{shortFormatNumber(product?.price, currency)}</div>
						<div className={styles.col}>{shortFormatNumber(product?.netAmount, currency)}</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default ProductDetails;
