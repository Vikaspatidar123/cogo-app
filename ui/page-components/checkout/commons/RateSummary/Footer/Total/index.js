import styles from './styles.module.css';

import formatAmount from '@/ui/commons/utils/formatAmount';

function RateSummaryFooterTotal({ rate }) {
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

	const isDiscounted = rate.tax_total_price_discounted < rate.tax_total_price;

	const atActuals = [];

	rate.costBreakdown?.forEach((item) => {
		if (!item.is_rate_available) {
			atActuals.push(item.title);
		}
	});

	return (
		<div className={styles.container}>
			<div className={styles.flex}>
				<div className={styles.title}>TOTAL LANDED COST</div>
				<div>
					{isDiscounted && <div className={styles.sub_text}>{getPrice(rate.tax_total_price)}</div>}
					<div className={styles.price}>{getPrice(rate.tax_total_price_discounted)}</div>
				</div>
			</div>
		</div>
	);
}

export default RateSummaryFooterTotal;
