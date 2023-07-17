import { useTranslation } from 'next-i18next';

import {
	actionButtonKeys,
	statusLabelTransformation,
} from '../../../configurations/key-mapping';
import getTicketStatus from '../../../utils/getTicketStatus';

import styles from './styles.module.css';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import formatDate from '@/ui/commons/utils/formatDate';

function TicketStructureBody({
	item = {},
	updateTicketActivity = () => {},
	setModalData = () => {},
	listType = '',
}) {
	const { t } = useTranslation(['common']);

	const {
		ID: id = '',
		Status: status = '',
		Description: description = '',
		CreatedAt: createdAt = '',
		TicketActivity: ticketActivity = {},
		Type: type = '',
		ActivityCount: activityCount = GLOBAL_CONSTANTS.zeroth_index,
	} = item || {};

	const statusLabel = statusLabelTransformation({ t });
	const actionButton = actionButtonKeys({ t });

	const { color: textColor = '', label = '' } = statusLabel?.[getTicketStatus(status)] || {};

	const handleTicketClick = (e) => {
		e.stopPropagation();
		updateTicketActivity({ status: actionButton?.[status]?.name, id });
	};

	const handleTicket = () => {
		if (listType === 'create') {
			const currentUrl = window.location.href;
			const urlEndRegexExp = new RegExp(GLOBAL_CONSTANTS.regex.url_end_slash);
			const newUrl = `${currentUrl
				.split('?')?.[GLOBAL_CONSTANTS.zeroth_index]
				.replace(urlEndRegexExp, '')}?ticketId=${id}`;

			window.open(newUrl, '_blank', 'noreferrer');
		}
		setModalData({
			type     : 'ticket_details',
			ticketId : id,
		});
	};

	return (
		<div
			onClick={handleTicket}
			role="presentation"
			className={styles.ticket_container}
		>
			<div className={styles.subcontainer_one}>
				<div className={styles.subcontainer_header}>
					<div className={styles.ticket_id}>
						#
						{id}
					</div>
					{listType !== 'create' && (
						<div
							role="presentation"
							className={styles.reopen_resolve}
							onClick={(e) => handleTicketClick(e)}
						>
							{actionButton?.[status]?.label || ''}
						</div>
					)}
				</div>
				<div className={styles.category_ticket_activity}>
					{type || description.substring(GLOBAL_CONSTANTS.zeroth_index, 100)}
				</div>
			</div>
			<div className={styles.subcontainer_two}>
				<div className={styles.subcontainer_header}>
					<div
						className={styles.ticket_status}
						style={{
							color: textColor || '#F68B21',
						}}
					>
						{label}
					</div>
					<div className={styles.ticket_date_time}>
						{formatDate({
							date       : createdAt,
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd/mm/yyyy'],
							separator  : ', ',
							timeFormat : GLOBAL_CONSTANTS.formats.time['HH:mm'],
							formatType : 'dateTime',
						})}
					</div>
				</div>
				<div className={styles.ticket_reason_box}>
					<div className={styles.description}>
						{(ticketActivity?.Description || description).substring(GLOBAL_CONSTANTS.zeroth_index, 100)}
					</div>
					{activityCount ? (
						<div className={styles.messages_nos}>{activityCount}</div>
					) : null}
				</div>
			</div>
		</div>
	);
}

export default TicketStructureBody;
