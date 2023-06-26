import { Modal, Button } from '@cogoport/components';
import { IcMTick } from '@cogoport/icons-react';

import styles from './styles.module.css';

function SuccessModal({
	ticketId = '',
	setTicketId = () => {},
	setModalData = () => {},
}) {
	return (
		<>
			<Modal.Header />
			<Modal.Body className={styles.modal_body}>
				<div className={styles.icon_container}>
					<IcMTick className={styles.tick_icon} />
				</div>
				<div className={styles.ticket_data}>
					<div className={styles.success_text}>
						Your ticket
						<span>
							#
							{ticketId}
						</span>
						has been raised successfully!
					</div>
					<div className={styles.wait_text}>
						Please wait while we look into the issue
					</div>
				</div>
			</Modal.Body>
			<Modal.Footer className={styles.modal_footer}>
				<Button size="md" themeType="tertiary" onClick={() => setTicketId('')}>
					Raise another ticket
				</Button>
				<Button
					size="md"
					themeType="accent"
					onClick={() => setModalData({ type: 'ticket_details', ticketId })}
				>
					View Ticket
				</Button>
			</Modal.Footer>
		</>
	);
}

export default SuccessModal;
