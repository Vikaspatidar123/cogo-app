import { Modal } from '@cogoport/components';
import { useState } from 'react';

import BankVerification from '../BankVerification';

function AddBankModal() {
	const [showAddBankModal, setShowAddBankModal] = useState(true);
	return (
		<Modal
			show={showAddBankModal}
			onClose={() => setShowAddBankModal((pv) => !pv)}
			placement="top"
			showCloseIcon
			size="xl"
			scroll
			style={{ maxHeight: '700px' }}
		>
			<Modal.Body style={{ maxHeight: '700px' }}>
				<BankVerification />
			</Modal.Body>
		</Modal>
	);
}
export default AddBankModal;
