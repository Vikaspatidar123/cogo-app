import { isEmpty } from '@cogoport/utils';

import CostBreakdown from './CostBreakdown';
import Header from './Header';
import styles from './styles.module.css';

function CheckoutServices({ allServices, rate, summary, refetch }) {
	if (isEmpty(summary)) {
		return null;
	}

	return (
		<div className={styles.container}>
			<Header rate={rate} summary={summary} />
			<CostBreakdown
				allServices={allServices}
				rate={rate}
				summary={summary}
				refetch={refetch}
			/>
		</div>
	);
}

export default CheckoutServices;
