import { Button, Modal } from '@cogoport/components';
import { IcMPlus } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import BankInfo from './components/BankInfo';
import BankVerification from './components/BankVerification';
import styles from './styles.module.css';

function BankDetails({
	getCreditRequestResponse = {},
}) {
	const [addBankModal, setAddBankModal] = useState(false);

	const { exporter_account_infos = [] } = getCreditRequestResponse || {};

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
				{!isEmpty(exporter_account_infos) && exporter_account_infos?.map((bank, index) => (
					<BankInfo
						bank={bank}
						index={index}
						getCreditRequestResponse={getCreditRequestResponse}
					/>
				))}
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
