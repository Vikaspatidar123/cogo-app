import { isEmpty } from '@cogoport/utils';

import TicketStructure from '../../../../common/TicketStructure';
import useListTickets from '../../../../hooks/useListTickets';

import styles from './styles.module.css';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const handleClick = () => {
	const currentUrl = window.location.href;
	const urlEndRegexExp = new RegExp(GLOBAL_CONSTANTS.regex.url_end_slash);
	const newUrl = `${currentUrl
		.split('?')?.[0]
		.replace(urlEndRegexExp, '')}?showticketslist=true`;
	window.open(newUrl, '_blank', 'noreferrer');
};

function RaisedTickets({ listType = 'list' }) {
	const { ticketData = {}, listLoading = false } = useListTickets({
		listType,
	});

	return (
		<div className={styles.container}>
			<div className={styles.raised_title}>
				Previously Raised Tickets
			</div>
			<TicketStructure
				ticketData={ticketData}
				listType={listType}
				listLoading={listLoading}
			/>
			{listType === 'create' && !isEmpty(ticketData) && (
				<div
					className={styles.link_all_tickets}
					role="presentation"
					onClick={handleClick}
				>
					See all tickets
				</div>
			)}
		</div>
	);
}

export default RaisedTickets;
