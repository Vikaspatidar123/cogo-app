import styles from './styles.module.css';

import formatAmount from '@/ui/commons/utils/formatAmount';

function RatePerContainer({ rates }) {
	const {
		total_price_discounted,
		total_price_currency,
		freight_price_currency,
		freight_price_discounted,
		service_type,
	} = rates;

	const UNIT_MAPPING = {
		fcl_freight : '/Ctr',
		lcl_freight : '/Wm',
		air_freight : '/Kg',
	};

	return (
		<div className={styles.container}>
			<div className={styles.basic_container}>
				<div className={styles.basic_type}>
					Price
					{UNIT_MAPPING[service_type]}
				</div>
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
			</div>
			<div className={styles.freight_baisc_container}>
				<div className={styles.basic_type}>
					Freight
					{UNIT_MAPPING[service_type]}
				</div>
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
		</div>
	);
}

export default RatePerContainer;
