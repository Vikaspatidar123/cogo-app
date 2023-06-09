import { Modal, Button } from '@cogoport/components';

import styles from './styles.module.css';

function ConfirmationModal({
	confirmationApproval,
	setConfirmationApproval,
	updateDocument,
	loading,
}) {
	const handleClick = async () => {
		await updateDocument('document_accepted');
		setConfirmationApproval(false);
	};

	return (
		<Modal
			show={confirmationApproval}
			onClose={() => setConfirmationApproval(false)}
			onOuterClick={() => setConfirmationApproval(false)}
		>
			<div className={styles.header}>Approval Confirmation</div>
			<div className={styles.content}>Are you sure you want to approve?</div>
			<div className={styles.button_container}>
				<Button
					className={styles.cancel_button}
					disabled={loading}
					onClick={() => setConfirmationApproval(false)}
				>
					Cancel
				</Button>
				<Button disabled={loading} onClick={() => handleClick()}>
					Approve
				</Button>
			</div>
		</Modal>
	);
}
export default ConfirmationModal;
