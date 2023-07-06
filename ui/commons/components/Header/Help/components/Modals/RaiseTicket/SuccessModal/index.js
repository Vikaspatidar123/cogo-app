import { Modal, Button } from '@cogoport/components';
import { IcMTick } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

const translationKey = 'common:components_header_tickets_create';

function SuccessModal({
	ticketId = '',
	setTicketId = () => {},
	setModalData = () => {},
}) {
	const { t } = useTranslation(['common']);

	return (
		<>
			<Modal.Header />
			<Modal.Body className={styles.modal_body}>
				<div className={styles.icon_container}>
					<IcMTick className={styles.tick_icon} />
				</div>
				<div className={styles.ticket_data}>
					<div className={styles.success_text}>
						{t(`${translationKey}_pre_success_text`)}
						<span>
							#
							{ticketId}
						</span>
						{t(`${translationKey}_post_success_text`)}
					</div>
					<div className={styles.wait_text}>
						{t(`${translationKey}_ticket_wait`)}
					</div>
				</div>
			</Modal.Body>
			<Modal.Footer className={styles.modal_footer}>
				<Button type="button" size="md" themeType="tertiary" onClick={() => setTicketId('')}>
					{t(`${translationKey}_raise_another`)}
				</Button>
				<Button
					size="md"
					themeType="accent"
					onClick={() => setModalData({ type: 'ticket_details', ticketId })}
				>
					{t(`${translationKey}_view_ticket`)}
				</Button>
			</Modal.Footer>
		</>
	);
}

export default SuccessModal;
