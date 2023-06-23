import { Button, Modal, Input } from '@cogoport/components';
import React, { useState } from 'react';

import styles from './styles.module.css';

function ConfirmationModal({
	showModal,
	setShowModal = () => {},
	loading,
	handleAction,
	rfqName,
	setRfqName = () => {},
}) {
	const handleClose = () => {
		setShowModal({ status: false, type: '' });
	};
	const [error, setError] = useState(false);

	return (
		<Modal
			show={showModal.status}
			onClose={handleClose}
			onOuterClick={handleClose}
			className="primary xs"
			closable={false}
		>
			<Modal.Body>
				<h3 className={styles.title}>
					{showModal.type === 'delete'
						? 'Are you sure you want to delete RFQ ?'
						: `Create Duplicate for the RFQ ID  ${showModal.serialId} ?`}
				</h3>
				{showModal.type === 'duplicate' && (
					<>
						<div className={styles.input_container}>
							<div className={styles.text_input}>RFQ Name:</div>
							<Input
								size="xs"
								value={rfqName}
								onChange={(e) => {
									setRfqName(e.target.value);
									if (error) {
										setError(false);
									}
								}}
								style={{ border: error && '1px solid #BF291E' }}
							/>
						</div>
						<div className={styles.error_container}>
							<div className={styles.error_text}>{error ? 'Required' : ' '}</div>
						</div>
					</>
				)}
				<div className={styles.button_wrapper}>
					<Button
						disabled={loading}
						onClick={handleClose}
						themeType="secondary"
					>
						No
					</Button>
					<Button
						disabled={loading}
						themeType="accent"
						onClick={() => handleAction(rfqName, error, setError)}
					>
						Yes
					</Button>
				</div>
			</Modal.Body>

		</Modal>
	);
}

export default ConfirmationModal;
