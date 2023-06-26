import { cl } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import FaqQuestions from '../../../../../common/FaqQuestions';

import MessageBody from './MessageBody';
import styles from './styles.module.css';
import TimeLine from './TimeLine';

import { Image, useRouter } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import formatDate from '@/ui/commons/utils/formatDate';

function TicketComment({
	type = '',
	createdAt = '',
	description = '',
	mediaUrls = [],
	userId = '',
	ticketType = '',
	systemUserID = '',
	restData = {},
	faqs = [],
	userType = '',
}) {
	const { locale = '', query } = useRouter();
	const isAgent = systemUserID !== userId || userType === 'system';

	const handleClick = () => {
		const baseUrl = window.location.origin;
		const urlToOpen = `${baseUrl}/${locale}/${query?.partner_id}/help-center`;
		window.open(urlToOpen, '_blank', 'noreferrer');
	};

	if (type === 'respond') {
		return (
			<div className={cl`${isAgent ? styles.agent_message_flex : ''}`}>
				{isAgent && (
					<Image
						src={GLOBAL_CONSTANTS.image_url.bot_icon}
						alt="agent"
						width={20}
						height={20}
						className={styles.agent_profile_pic}
					/>
				)}
				<div
					className={cl`${
						isAgent ? styles.message_div : styles.user_message_flex
					}`}
				>
					<div className={styles.header_flex}>
						<div className={styles.name_div}>
							{isAgent ? 'Agent' : 'You'}
							,
						</div>
						<div className={styles.time}>
							{formatDate({
								date       : createdAt,
								dateFormat : GLOBAL_CONSTANTS.formats.date['dd-MMM-yyyy'],
								separator  : ' ',
								timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
								formatType : 'dateTime',
							})}
						</div>
					</div>
					<div className={styles.message_container}>
						<MessageBody
							message={description}
							mediaUrls={mediaUrls}
							restData={restData}
						/>
					</div>
					{!isEmpty(faqs) && (
						<div className={styles.faqs_container}>
							<FaqQuestions data={faqs} fromChat />
							<div
								className={styles.view_more_btn}
								role="presentation"
								onClick={handleClick}
							>
								View More
							</div>
						</div>
					)}
				</div>
			</div>
		);
	}

	return (
		<TimeLine
			type={type}
			description={description}
			createdAt={createdAt}
			ticketType={ticketType}
		/>
	);
}

export default TicketComment;
