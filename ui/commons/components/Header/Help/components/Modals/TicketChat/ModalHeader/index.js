import { Button } from '@cogoport/components';
import { IcMArrowBack, IcMRefresh } from '@cogoport/icons-react';

import { actionButtonKeys } from '../../../../configurations/key-mapping';
import useUpdateTicketActivity from '../../../../hooks/useUpdateTicketActivity';

import styles from './styles.module.css';

function ModalHeader({
	setModalData = () => {},
	ticketData = {},
	refetchTicket = () => {},
	ticketExists = false,
}) {
	const actionButton = actionButtonKeys();
	const { ID: id = '', Status: status = '' } = ticketData?.Ticket || {};

	const { name = '', label = '' } = actionButton?.[status] || {};

	const { updateTicketActivity = () => {} } = useUpdateTicketActivity({
		refetchTicket,
	});

	return (
		<div className={styles.header_container}>
			<div className={styles.tickets_header}>
				<IcMArrowBack
					onClick={() => setModalData({ type: 'tickets_list' })}
					className={styles.back_icon}
				/>
				<div className={styles.tickets_header_text}>
					Chat
				</div>
				<IcMRefresh className={styles.refresh_icon} onClick={refetchTicket} />
			</div>
			<div className={styles.header_buttons}>
				<Button
					size="md"
					themeType="primary"
					onClick={() => updateTicketActivity({ status: name, id })}
					disabled={!ticketExists || status === 'rejected'}
				>
					{label || 'Resolve'}
				</Button>
			</div>
		</div>
	);
}

export default ModalHeader;
