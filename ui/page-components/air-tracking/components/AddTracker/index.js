import { useState } from 'react';

import CsvForm from './CsvForm';
import RenderForm from './RenderForm';
import styles from './styles.module.css';

import { Button, Toggle } from '@cogoport/components';

const { Modal } = require('@cogoport/components');

function AddTrackerModal({ show, onclose }) {
	const [labeledValue, setLabeledValue] = useState(false);
	const onchange = () => {
		setLabeledValue(!labeledValue);
	};

	return (
		<div>
			<Modal size="lg" show={show} onClose={onclose} placement="center">
				<Modal.Header title="Track Cargo" />
				<Modal.Body>

					<p>Enter a airway bill number to start tracking your shipment.</p>
					<p>
						You can then set up daily status reports, and alerts to various stakeholders, on the next page.
					</p>
					<div className={styles.content}>
						<img
							src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/heeee.svg"
							alt="tracking"
							className={styles.image}
						/>
						<div className={styles.items}>
							<Toggle
								name="a2"
								size="md"
								disabled={false}
								onLabel="Upload CSV"
								onChange={() => onchange()}
								value={labeledValue}
							/>
							{labeledValue && (
								<a
									href="https://cogoport-production.sgp1.
									digitaloceanspaces.com/ea41e8fc91cc30257bb086056c3b6291/
									airway_bill_no.csv"
									download="container_number_for_csv.csv"
									style={{ marginLeft: 5, fontSize: 10 }}
								>
									Sample
								</a>
							)}
						</div>
						{!labeledValue ? <RenderForm /> : <CsvForm />}
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
