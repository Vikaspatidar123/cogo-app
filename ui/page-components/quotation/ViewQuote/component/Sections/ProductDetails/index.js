import { cl } from '@cogoport/components';

// import ViewQuotation from '../..';

import styles from './styles.module.css';

function ProductDetails({ products = {} }) {
	const productLength = products.length - 2;
	// console.log(view);
	// console.log(viewQuoteData.products);
	console.log(productLength, 'productLength');
	return (
		<div className={styles.containers}>
			<div className={cl`${styles.cardheader} ${styles.card_data}`}>
				<div className={styles.inside_card}>Name</div>
				<div className={styles.inside2}>Description</div>
				<div className={styles.inside3}>HS Code</div>
				<div className={styles.inside4}>Quantity</div>
				<div className={styles.inside_card}>Selling Price</div>
				<div className={styles.inside_card}>Total Price</div>
			</div>
			{(products || []).map((items, index) => (

				<div className={cl`${styles.card_body}
                ${styles.card_data} ${index <= productLength && styles.border}`}
				>
					<div className={styles.inside_card}>{items.name}</div>
					<div className={styles.inside2}>{items.description}</div>
					<div className={styles.inside3}>{items.hsCode}</div>
					<div className={styles.inside4}>{items.quantity}</div>
					<div className={styles.inside_card}>{items.price}</div>
					<div className={styles.inside_card}>{items.netAmount}</div>

				</div>
			))}

		</div>
	);
}
export default ProductDetails;
