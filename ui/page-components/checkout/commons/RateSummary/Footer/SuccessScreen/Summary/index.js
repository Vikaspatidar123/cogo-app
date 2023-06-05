import RouteDisplay from '../../../../RouteDisplay';

import Operator from './Operator';
import styles from './styles.module.css';

function CheckoutSuccessScreenSummary({ rate, summary }) {
	return (
		<div className={styles.container}>
			<Operator service={summary.primary_service} rate={rate} />
			<div className={styles.main}>
				<RouteDisplay
					trade_type={summary.trade_type}
					mode={summary.mode}
					port={rate.port}
					origin={rate.origin}
					destination={rate.destination}
				/>
			</div>
		</div>
	);
}

export default CheckoutSuccessScreenSummary;
