import { useTranslation } from 'react-i18next';

import { statusLabelTransformation } from '../../../../configurations/key-mapping';
import getTicketStatus from '../../../../utils/getTicketStatus';

import styles from './styles.module.css';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import formatDate from '@/ui/commons/utils/formatDate';

const translationKey = 'common:components_header_tickets_summary';

function TicketSummary({ ticketDetails = {} }) {
	const { t } = useTranslation(['common']);

	const statusLabel = statusLabelTransformation({ t });
	const {
		ID: id = '',
		Type: type = '',
		Status: status = '',
		UpdatedAt: updatedAt = '',
		CreatedAt: createdAt = '',
	} = ticketDetails || {};

	const { label = '' } = statusLabel?.[getTicketStatus(status)] || {};

	return (
		<div className={styles.container}>
			<div className={styles.header}>{t(`${translationKey}_header`)}</div>
			<div className={styles.ticket_body}>
				<div className={styles.ticket_header}>
					<div className={styles.ticket_id}>
						#
						{id}
					</div>
					<div className={styles.description}>{type}</div>
				</div>
				<div className={styles.ticket_status}>
					<div>{label || status}</div>
					<div className={styles.updated_at}>
						{formatDate({
							date       : updatedAt,
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd/mm/yyyy'],
							separator  : ', ',
							timeFormat : GLOBAL_CONSTANTS.formats.time['HH:mm'],
							formatType : 'dateTime',
						})}
					</div>
				</div>
			</div>

			<div className={styles.ticket_data}>
				{t(`${translationKey}_${status === 'closed' ? 'resolved' : 'created'}`)}
				<span className={styles.updated_at}>
					{formatDate({
						date       : status === 'closed' ? updatedAt : createdAt,
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd/mm/yyyy'],
						separator  : ', ',
						timeFormat : GLOBAL_CONSTANTS.formats.time['HH:mm'],
						formatType : 'dateTime',
					})}
				</span>
			</div>
		</div>
	);
}

export default TicketSummary;
