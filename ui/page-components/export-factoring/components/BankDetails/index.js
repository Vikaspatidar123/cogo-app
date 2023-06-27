import { Button, Modal } from '@cogoport/components';
import { IcMPlus } from '@cogoport/icons-react';
import { useState } from 'react';

import BankInfo from './components/BankInfo';
import BankVerification from './components/BankVerification';
import styles from './styles.module.css';

function BankDetails() {
	const [addBankModal, setAddBankModal] = useState(false);
	return (
		<div>
			<div className={styles.header_div}>
				<div className={styles.header}>
					Bank Information
				</div>
				<Button
					type="button"
					size="md"
					onClick={() => setAddBankModal((pv) => !pv)}
				>
					<IcMPlus />
					Add Bank
				</Button>
			</div>
			<div>
				<BankInfo />
			</div>
			{addBankModal && (
				<Modal
					show={addBankModal}
					onClose={() => { setAddBankModal((pv) => !pv); }}
					style={{ padding: '20px' }}
					size="lg"
				>
					<Modal.Body style={{ minHeight: '500px' }}>
						<BankVerification setAddBankModal={setAddBankModal} />
					</Modal.Body>
				</Modal>
			)}
		</div>
	);
}

export default BankDetails;
