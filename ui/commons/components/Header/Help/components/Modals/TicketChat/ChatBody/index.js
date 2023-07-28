import { Placeholder, cl } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import EmptyStateTicketStructure from '../../../../common/TicketStructure/EmptyStateTicketStructure';
import { MESSAGE_COUNT_TO_SHOWN } from '../../../../constants';

import InitialMessage from './initialMessage';
import styles from './styles.module.css';
import TicketComment from './TicketComment';

import { useSelector } from '@/packages/store';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const translationKey = 'common:components_header_tickets_details';

const LENGTH_INDEX = 1;
const ARRAY_SIZE = 9;
const EMPTY_ARR = [...Array(ARRAY_SIZE).keys()];

function ChatBody({
	listData = {},
	chatLoading = false,
	getTicketActivity = () => {},
	messageRef = {},
	ticketData = {},
	ticketExists = false,
	setModalData = () => {},
	modalData = {},
	detailsLoading = false,
}) {
	const { t } = useTranslation(['common']);

	const { id: userId = '' } = useSelector(({ profile }) => profile);
	const { items = [], last, page } = listData;

	const handleScroll = (e) => {
		const bottom = e.target.scrollTop === GLOBAL_CONSTANTS.zeroth_index;
		if (!last && bottom && !chatLoading) {
			getTicketActivity((page || GLOBAL_CONSTANTS.zeroth_index) + LENGTH_INDEX);
		}
	};

	if (!ticketExists && !chatLoading) {
		const emptyText = `${t(`${translationKey}_pre_norecords`)} #${
			modalData?.ticketId
		} ${t(`${translationKey}_post_norecords`)}`;

		return (
			<EmptyStateTicketStructure
				setModalData={setModalData}
				emptyText={emptyText}
			/>
		);
	}

	return (
		<div className={styles.container} ref={messageRef} onScroll={handleScroll}>
			{chatLoading
				&& EMPTY_ARR.map((key, idx) => (
					<div
						key={key}
						className={cl`${idx % 2 !== GLOBAL_CONSTANTS.zeroth_index ? styles.right_align : ''}`}
					>
						<Placeholder className={styles.loading_skeleton} />
					</div>
				))}

			{(last || (items || []).length < MESSAGE_COUNT_TO_SHOWN)
				&& !detailsLoading && (
					<InitialMessage ticketData={ticketData} userId={userId} />
			)}

			{[...(items || [])].reverse().map((itm = {}) => {
				const {
					Type: type = '',
					Description: description = '',
					CreatedAt: createdAt = '',
					Data: data = {},
					UserType: userType = '',
					UserID: systemUserID = '',
				} = itm || {};

				const {
					Url: mediaUrls = [],
					TicketType: ticketType = '',
					Faq: faqs = [],
				} = data || {};

				return (
					<TicketComment
						key={createdAt}
						type={type}
						createdAt={createdAt}
						description={description}
						mediaUrls={mediaUrls}
						userId={userId}
						systemUserID={systemUserID}
						ticketType={ticketType}
						faqs={faqs}
						userType={userType}
					/>
				);
			})}
		</div>
	);
}

export default ChatBody;
