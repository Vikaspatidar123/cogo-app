import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import TicketStructure from '../../../../common/TicketStructure';
import useListTickets from '../../../../hooks/useListTickets';

import styles from './styles.module.css';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const translationKey = 'common:components_header_tickets_list';

const handleClick = () => {
	const currentUrl = window.location.href;
	const urlEndRegexExp = new RegExp(GLOBAL_CONSTANTS.regex.url_end_slash);
	const newUrl = `${currentUrl
		.split('?')?.[GLOBAL_CONSTANTS.zeroth_index]
		.replace(urlEndRegexExp, '')}?showticketslist=true`;
	window.open(newUrl, '_blank', 'noreferrer');
};

function RaisedTickets({ listType = 'list' }) {
	const { t } = useTranslation(['common']);

	const { ticketData = {}, listLoading = false } = useListTickets({
		listType,
	});

	return (
		<div className={styles.container}>
			<div className={styles.raised_title}>
				{t(`${translationKey}_previous_tickets`)}
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
					{t(`${translationKey}_all_tickets`)}
				</div>
			)}
		</div>
	);
}

export default RaisedTickets;
