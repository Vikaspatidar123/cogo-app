import { Button } from '@cogoport/components';
import { IcMArrowBack, IcMRefresh } from '@cogoport/icons-react';
import { useTranslation } from 'react-i18next';

import { actionButtonKeys } from '../../../../configurations/key-mapping';
import useUpdateTicketActivity from '../../../../hooks/useUpdateTicketActivity';

import styles from './styles.module.css';

const translationKey = 'common:components_header_tickets_details';

function ModalHeader({
	setModalData = () => {},
	ticketData = {},
	refetchTicket = () => {},
	ticketExists = false,
}) {
	const { t } = useTranslation(['common']);

	const actionButton = actionButtonKeys({ t });
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
					{t(`${translationKey}_header`)}
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
					{label || t(`${translationKey}_resolve`)}
				</Button>
			</div>
		</div>
	);
}

export default ModalHeader;
