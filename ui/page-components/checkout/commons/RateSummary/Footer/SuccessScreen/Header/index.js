import { IcCFtick } from '@cogoport/icons-react';

import styles from './styles.module.css';

function CheckoutSuccessScreenHeader() {
	return (
		<div className={styles.container}>
			<div className={styles.title}>Congratulations!</div>
			<div className={styles.sub_title}>
				<IcCFtick height={24} width={24} className="icon" />
				You have successfully booked your shipment!
			</div>
		</div>
	);
}

export default CheckoutSuccessScreenHeader;
