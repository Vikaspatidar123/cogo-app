import { Input, Button, Select } from '@cogoport/components';
import { IcMTracking } from '@cogoport/icons-react';

import styles from './styles.module.css';

function TrackShipment() {
	return (
		<div className={styles.container}>
			<div className={styles.text}>Track your shipment!</div>
			<div className={styles.line} />
			<div className={styles.input_box}>
				<div>
					<Input size="sm" className={styles.input_container} placeholder="Search here" />
					<Select size="sm" className={styles.input_container} placeholder="Select shipping line" />
					<Button size="md" themeType="secondary" className={styles.button_container}>
						Track Now
						<IcMTracking />
					</Button>
				</div>
			</div>
		</div>
	);
}
export default TrackShipment;
