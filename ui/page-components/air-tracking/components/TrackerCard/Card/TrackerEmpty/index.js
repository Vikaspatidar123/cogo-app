import { IcMDelete } from '@cogoport/icons-react';

import styles from './styles.module.css';

function TrackerEmpty({ tracker, handleDelete, getOption }) {
	return (
		<div>
			{getOption()}
			<div className={styles.delete}>
				<IcMDelete onClick={() => handleDelete({ show: false })} />
			</div>

			<div className={styles.container}>

				<div>
					<div className={styles.booking_no}>
						{`Airway bill no: ${tracker.input}`}
					</div>
				</div>
				<div className={styles.tracking}>Retrieving Tracking Data</div>
				<div className={styles.dec}>
					Fetching data on this cargo /
					shipment is taking longer than usual. We will inform you as soon as its available.

				</div>
			</div>
		</div>
	);
}
export default TrackerEmpty;
