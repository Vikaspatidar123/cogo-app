import { Button, Modal } from '@cogoport/components';
import { IcMError } from '@cogoport/icons-react';

import styles from './styles.module.css';
import text from './text';

function BuyModal({
	noteModal = false,
	setNoteModal = () => {},
	handleSubmit = () => {},
	paymentLoading = false,
	insuranceLoading = false,
}) {
	const { first_paragraph, second_para } = text || {};
	return (
		<Modal show={noteModal} onClose={() => setNoteModal(false)} size="lg">
			<div className={styles.wrapper}>
				<div className={styles.title}>
					<IcMError fill="#f68b21" />
					Note
				</div>
				<div className={styles.textWrapper}>
					<div className={styles.text}>
						{first_paragraph}
					</div>
					<div className={styles.text}>
						{second_para}
					</div>
				</div>
			</div>
			<div className={styles.button_div}>
				<Button
					onClick={() => handleSubmit()}
					loading={paymentLoading || insuranceLoading}
					disabled={paymentLoading || insuranceLoading}
				>
					Buy Insurance
				</Button>
			</div>
		</Modal>
	);
}

export default BuyModal;
