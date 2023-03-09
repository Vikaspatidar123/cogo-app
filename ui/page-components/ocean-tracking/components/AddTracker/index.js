import { useState } from 'react';

import styles from './styles.module.css';

import { Button, Toggle } from '@cogoport/components';

const { Modal } = require('@cogoport/components');

function AddTrackerModal({ show, onclose }) {
	const SEARCH_TYPES = {
		CONTAINER_NUMBER : 'CONTAINER_NO',
		BOOKING_NUMBER   : 'BOOKING_NO/BL_NO',
		BL_NUMBER        : 'BL_NO',
	};

	const SEARCH_TYPES_OPTIONS = [
		{ label: 'Booking No / BL No', value: SEARCH_TYPES.BOOKING_NUMBER },
		{ label: 'Container Number', value: SEARCH_TYPES.CONTAINER_NUMBER },
	];
	const [labeledValue, setLabeledValue] = useState(false);
	const onchange = () => {
		setLabeledValue(!labeledValue);
	};
	const renderForm=()

	return (
		<div>
			<Modal size="lg" show={show} onClose={!show} placement="center" onClose={onclose}>
				<Modal.Header title="Track Shipments" />
				<Modal.Body>

					<p>Enter a container number to start tracking your shipment.</p>
					<p>
						You can then set up daily status reports, and alerts to various stakeholders, on the next page.
					</p>
					<div className={styles.content}>
						<img
							src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/track.svg"
							alt="tracking"
							className={styles.image}
						/>
						<div className={styles.items}>
							<Toggle
								name="a2"
								size="md"
								disabled={false}
								onLabel="Upload CSV"
								// onLabel={{ label: 'Upload CSV', value: true }}
								onChange={() => onchange()}
								value={labeledValue}
							/>
							{labeledValue && (
								<a
									href="https://cogoport-production.sgp1.digitaloceanspaces.com/abc08dbaa530705b07065bb93914cea0/container_number_for_csv.csv"
									download="container_number_for_csv.csv"
									style={{ marginLeft: 5, fontSize: 10 }}
								>
									{' '}
									Sample
								</a>
							)}
						</div>
						{!labeledValue ? renderForm() : renderCsvForm()}
					</div>

				</Modal.Body>
				<Modal.Footer>
					<Button onClick={onclose}>Cancel</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}
export default AddTrackerModal;
