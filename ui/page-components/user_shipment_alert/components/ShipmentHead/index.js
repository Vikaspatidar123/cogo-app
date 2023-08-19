import { Button } from '@cogoport/components';

import styles from './styles.module.css';

function ShipmentHead({ showTitleType, setShow }) {
	return (
		<div className={styles.container}>
			<div className={styles.box}>
				<div className={styles.heading}>Shipment Status Report (SSR)</div>
				<div>A comprehensive report of all Ongoing Shipments. Login to view more data Points</div>
				<div className={styles.button}>
					<Button
						type="button"
						onClick={() => {
							showTitleType('View full Report');
							setShow(true);
						}}
					>
						Login to View Full Report

					</Button>
				</div>
			</div>
		</div>
	);
}

export default ShipmentHead;
