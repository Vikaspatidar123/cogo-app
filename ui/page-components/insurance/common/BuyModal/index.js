import { Button, Modal } from '@cogoport/components';
import { IcMError } from '@cogoport/icons-react';

import styles from './styles.module.css';

function BuyModal({
	noteModal = false,
	setNoteModal = () => {},
	handleSubmit = () => {},
	paymentLoading = false,
	insuranceLoading = false,
}) {
	return (
		<Modal show={noteModal} onClose={() => setNoteModal(false)} size="lg">
			<div className={styles.wrapper}>
				<div className={styles.title}>
					<IcMError fill="#f68b21" />
					Note
				</div>
				<div className={styles.textWrapper}>
					<div className={styles.text}>
						Please note that the Cogoport Group entities merely connect you with insurance
						parties in relation to your insurance requirements. Cogoport Group entities do
						not act as an insurance agent, insurance broker, insurance service provider or
						any other insurance intermediary or an entity under a similar concept under
						any applicable law.
					</div>
					<div className={styles.text}>
						Cogoport Group does not assume any responsibility in relation to your
						insurance requirements and shall not be responsible any claims in relation to
						the insurance products obtained by you. You are required to directly
						coordinate with the relevant entity for the same.
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
