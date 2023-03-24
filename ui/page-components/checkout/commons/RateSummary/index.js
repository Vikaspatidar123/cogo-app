import ExchangeRate from '../ExchangeRate';

import CostBreakdown from './CostBreakdown';
import Footer from './Footer';
import styles from './styles.module.css';

function RateSummary({
	detail,
	rate,
	summary,
	cogopoint_data,
	refetch,
	getCheckoutLoading,
	conversions,
}) {
	return (
		<div className={styles.container}>
			<CostBreakdown
				rate={{
					...rate,
					redeemed_cogopoints: cogopoint_data.redeemed_cogopoints,
				}}
				primaryService={summary.primary_service}
			/>

			<ExchangeRate
				detail={detail}
				conversions={conversions}
				rate={rate}
				refetch={refetch}
			/>

			<Footer
				rate={rate}
				detail={detail}
				summary={summary}
				refetch={refetch}
				cogopoint_data={cogopoint_data}
				getCheckoutLoading={getCheckoutLoading}
			/>
		</div>
	);
}

export default RateSummary;
