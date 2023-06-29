import { Button, cl } from '@cogoport/components';
import { IcMTicket } from '@cogoport/icons-react';

import styles from './styles.module.css';

function EmptyStateTicketStructure({
	setModalData,
	listType = '',
	emptyText = '',
}) {
	const listEmptyText = emptyText || 'No Tickets Raised';

	return (
		<div
			className={cl`${styles.container} ${
				listType === 'create' ? styles.create_raise_box : ''
			}`}
		>
			<IcMTicket className={styles.icm_tag} />
			<div className={styles.ticket_label}>{listEmptyText}</div>
			{listType !== 'create' && (
				<Button
					themeType="secondary"
					className={styles.ticket_raise_button}
					onClick={() => setModalData({ type: 'raise_a_ticket' })}
				>
					Raise a Ticket
				</Button>
			)}
		</div>
	);
}

export default EmptyStateTicketStructure;
