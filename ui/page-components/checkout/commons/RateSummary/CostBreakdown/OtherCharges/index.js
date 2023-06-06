import OtherChargeItem from './OtherChargeItem';
import styles from './styles.module.css';

function RateSummaryCostBreakdownOtherCharges({ rate }) {
	const charges = Object.values(rate?.booking_charges || {}).map((item) => ({
		...item.line_items[0],
	}));

	if (!charges.length) {
		return null;
	}

	return (
		<div className={styles.container}>
			{charges.map((item) => (
				<OtherChargeItem key={item.code} item={item} />
			))}
			<OtherChargeItem
				item={{
					name                   : 'Total Tax',
					total_price_discounted : rate.tax_price,
					total_price            : rate.tax_price_discounted,
					currency               : rate.tax_price_currency,
				}}
			/>
			{rate.redeemed_cogopoints?.line_items && (
				<OtherChargeItem item={rate.redeemed_cogopoints.line_items[0]} />
			)}
		</div>
	);
}

export default RateSummaryCostBreakdownOtherCharges;
