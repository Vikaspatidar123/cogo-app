import { Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import CheckoutFooterHowItWorks from '../../../AssistanceFooter/HowItWorks';
import CheckoutRMDetails from '../../../AssistanceFooter/RMDetails';

import Header from './Header';
import styles from './styles.module.css';
import Summary from './Summary';

import { useRouter } from '@/packages/next';

function CheckoutSuccessScreen({ rate, summary, shipmentId }) {
	const { push } = useRouter();
	if (isEmpty(rate)) {
		return null;
	}

	return (
		<div className={styles.container}>
			<Header />

			<div className={styles.main}>
				<Summary rate={rate} summary={summary} />

				<div className={styles.rmdetails_container}>
					<CheckoutRMDetails />
				</div>

				<div className={styles.line} />

				<CheckoutFooterHowItWorks />

				<div className={styles.footer}>
					<Button
						role="presentation"
						onClick={() => {
							sessionStorage.setItem('prev_nav_restricted', 'true');
							push('/shipments/[id]', `/shipments/${shipmentId}`);
						}}
					>
						Go To Shipment
					</Button>
				</div>
			</div>
		</div>
	);
}

export default CheckoutSuccessScreen;
