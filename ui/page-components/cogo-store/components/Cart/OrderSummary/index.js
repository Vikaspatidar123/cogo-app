import { IcCCogoCoin } from '@cogoport/icons-react';

import styles from './styles.module.css';

function OrderSummary({ cartSummary = {} }) {
	const { cogopoints = 0, quantity = 0, product_code = {} } = cartSummary;

	const { name = '' } = product_code || {};
	return (
		<div className={styles.order_summary}>
			<div className={styles.order_name}>{name}</div>
			<div className={styles.order_price}>
				<IcCCogoCoin height={25} width={25} />
				{cogopoints} X {quantity}
			</div>
		</div>
	);
}

export default OrderSummary;
