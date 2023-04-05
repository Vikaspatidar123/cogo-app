import { cl } from '@cogoport/components';

import units from '../../../utils/units.json';

import styles from './styles.module.css';

import formatAmount from '@/ui/commons/utils/formatAmount';

function CostBreakdownServiceLineItem({ lineItem }) {
	const getPrice = (price) => formatAmount({
		amount   : price,
		currency : lineItem.currency,
		options  : {
			minimumFractionDigits : 0,
			maximumFractionDigits : 0,
			style                 : 'currency',
			currencyDisplay       : 'code',
		},
	});

	const isDiscounted = lineItem.total_price !== lineItem.total_price_discounted;

	const renderDetails = () => (
		<div className={styles.details}>
			{`${lineItem.quantity} x ${getPrice(
				lineItem.price_discounted,
			)} / ${
				units[lineItem.unit] || lineItem.unit?.replace('_', ' ')
			}`}
		</div>
	);

	const renderPrice = () => (
		<div className={styles.price}>
			{isDiscounted && (
				<div className={styles.cancelled}>{getPrice(lineItem.total_price)}</div>
			)}
			{getPrice(lineItem.total_price_discounted)}
		</div>
	);

	return (
		<div className={styles.container}>
			<div className={styles.row}>
				<div className={styles.col}>
					<div className={styles.title}>{`${lineItem.name} (${lineItem.code})`}</div>
				</div>
				<div className={styles.col}>
					<div className={styles.hidden}>{renderPrice()}</div>
					<div className={styles.visible}>{renderDetails()}</div>
				</div>
				<div className={styles.col}>
					<div className={styles.hidden}>{renderDetails()}</div>
					<div className={cl`${styles.visible} ${styles.price}`}>{renderPrice()}</div>
				</div>
			</div>
		</div>
	);
}

export default CostBreakdownServiceLineItem;
