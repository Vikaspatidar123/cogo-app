import styles from './styles.module.css';

import formatAmount from '@/ui/commons/utils/formatAmount';

function PromoDiscount({ rate }) {
	const total_discount = rate.tax_total_price - rate.tax_total_price_discounted;

	const total_discount_percent = Math.round(
		(total_discount / rate.tax_total_price) * 100,
	);

	const getPrice = (price) => formatAmount({
		amount   : price,
		currency : rate.tax_price_currency,
		options  : {
			style                 : 'currency',
			currencyDisplay       : 'code',
			minimumFractionDigits : 0,
			maximumFractionDigits : 0,
		},
	});

	if (!total_discount > 0) {
		return null;
	}

	return (
		<div className={styles.container}>
			<div className={styles.Message}>

				Wow! you saved
				{' '}
				{getPrice(total_discount)}
				{' '}
				(
				{total_discount_percent}
				%)
			</div>
			<div className={styles.discount}>
				{' '}
				{getPrice(rate.tax_total_price)}
			</div>
		</div>
	);
}

export default PromoDiscount;
