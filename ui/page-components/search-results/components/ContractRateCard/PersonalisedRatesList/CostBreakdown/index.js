import LineItems from './LineItems';
import styles from './styles.module.css';

import formatAmount from '@/ui/commons/utils/formatAmount';

function CostBreakdown({
	line_items = [],
	total_price,
	total_price_currency,
}) {
	return (
		<div className={styles.container}>
			<div className={styles.main_heading}>Cost Breakdown</div>
			<LineItems line_items={line_items} />
			<div className={styles.footer_div}>
				<div className={styles.total_heading}>Total</div>
				<div className={styles.total_amount}>
					{formatAmount({
						amount   : total_price || 0,
						currency : total_price_currency,
						options  : {
							style                 : 'currency',
							currencyDisplay       : 'symbol',
							maximumFractionDigits : 0,
						},
					})}
				</div>
			</div>
		</div>
	);
}

export default CostBreakdown;
