import { cl } from '@cogoport/components';

import productConfig from '../../configuration/productConfig';
import { CURRENCY_OPTION } from '../../constant/currencyOption';

import styles from './styles.module.css';

import formatAmount from '@/ui/commons/utils/formatAmount';

const renderData = (key, data, currency) => {
	if (key === 'price' || key === 'netAmount') {
		return formatAmount({
			amount  : data?.[key],
			currency,
			options : CURRENCY_OPTION,
		});
	}
	return data?.[key] || '--';
};

function ProductDetails({ products = [], currency }) {
	const productsLength = products?.length;
	return (
		<div className={styles.container}>
			<h2 className={styles.title}>Product Details</h2>

			<div className={styles.scroll_container}>
				<div className={cl`${styles.row} ${styles.cardheader}`}>
					{productConfig.map((config) => (
						<div
							key={config?.key}
							style={{ width: config.width ?? '' }}
							className={styles.col}
						>
							{config?.name}
						</div>
					))}
				</div>

				{(products || []).map((product, index) => (
					<div
						className={cl`${styles.row} ${styles.tbody}
					${index % 2 === 0 ? styles.row_bg : ''} ${index === productsLength - 1 ? styles.last_row : ''}`}
						key={product?.productId}
					>
						{productConfig.map((config) => (
							<div
								key={config?.key}
								style={{ width: config.width ?? '' }}
								className={styles.col}
							>
								{renderData(config.key, product, currency)}
							</div>
						))}
					</div>
				))}
			</div>
		</div>
	);
}

export default ProductDetails;
