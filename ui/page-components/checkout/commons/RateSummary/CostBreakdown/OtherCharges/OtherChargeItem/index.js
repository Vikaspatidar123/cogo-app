import styles from './styles.module.css';

import formatAmount from '@/ui/commons/utils/formatAmount';

function RateSummaryCostBreakdownOtherChargesItem({ item }) {
	const getPrice = (price) => formatAmount({
		amount   : price,
		currency : item.currency,
		options  : {
			minimumFractionDigits : 0,
			maximumFractionDigits : 0,
			style                 : 'currency',
			currencyDisplay       : 'code',
		},
	});

	const isDiscounted = item.total_price_discounted - item.total_price !== 0;

	if (item.total_price_discounted === 0 && !isDiscounted) {
		return null;
	}

	return (
		<div className={styles.container}>
			<div className={styles.Title}>
				{item.name}
			</div>
			<div className={styles.price}>
				{isDiscounted && <div className={styles.cancelled}>{getPrice(item.total_price)}</div>}
				{getPrice(item.total_price_discounted)}
			</div>
		</div>
	);
}

export default RateSummaryCostBreakdownOtherChargesItem;
