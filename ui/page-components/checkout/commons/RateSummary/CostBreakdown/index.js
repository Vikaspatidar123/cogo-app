import CostBreakdownRate from './CostBreakdownRate';
import OtherCharges from './OtherCharges';
import styles from './styles.module.css';

function RateSummaryCostBreakdown({ rate, primaryService }) {
	const { costBreakdown } = rate;
	return (
		<div className={styles.container}>
			{costBreakdown.map((constBreakdownItem) => (
				<CostBreakdownRate
					key={`${constBreakdownItem.title}_${constBreakdownItem.container}`}
					{...constBreakdownItem}
					primaryService={primaryService}
				/>
			))}
			<OtherCharges rate={rate} />
		</div>
	);
}

export default RateSummaryCostBreakdown;
