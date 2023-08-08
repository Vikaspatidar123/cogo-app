import styles from './styles.module.css';

import formatAmount from '@/ui/commons/utils/formatAmount';

function RatePerContainer({ rates }) {
	const {
		total_price_discounted,
		total_price_currency,
		freight_price_currency,
		freight_price_discounted,
	} = rates;

	return (
		<div className={styles.container}>
			<div className={styles.basic_container} style={{ marginBottom: '12px' }}>
				<p className={styles.text_info}>Basic Freight</p>

				<div className={styles.local_price}>
					{formatAmount({
						amount   : freight_price_discounted,
						currency : freight_price_currency,
						options  : {
							style                 : 'currency',
							currencyDisplay       : 'code',
							maximumFractionDigits : 0,
						},
					})}
				</div>
			</div>

			<div className={styles.basic_container}>
				<p className={styles.text_info}>Total</p>

				<div className={styles.basic_price}>
					{formatAmount({
						amount   : total_price_discounted,
						currency : total_price_currency,
						options  : {
							style                 : 'currency',
							currencyDisplay       : 'code',
							maximumFractionDigits : 0,
						},
					})}
				</div>

				<p className={styles.text_info}>(Inc. All Services)</p>
			</div>
		</div>
	);
}

export default RatePerContainer;
