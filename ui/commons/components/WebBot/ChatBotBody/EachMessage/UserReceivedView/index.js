import { IcCSendWhatsapp } from '@cogoport/icons-react';

import MessageBody from '../MessageBody';

import FooterItems from './FooterItems';
import styles from './styles.module.css';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import formatDate from '@/ui/commons/utils/formatDate';

function UserReceivedView({
	eachMessage,
	sendFirebaseMessage,
	sendMessageLoading,
}) {
	const { response = {}, created_at, message_type } = eachMessage || {};
	const sentAt = formatDate({
		date       : new Date(created_at),
		dateFormat : GLOBAL_CONSTANTS.formats.date['hh:mm'],
		formatType : 'dateTime',
		separator  : ' ',
	});

	const { whatsapp_get_started_link = '' } = response || {};

	return (
		<div className={styles.parent_div}>
			<div className={styles.user_chat}>
				<MessageBody response={response} message_type={message_type} />
				{whatsapp_get_started_link && (
					<div
						onClick={() => window.open(whatsapp_get_started_link, '_blank')}
						role="presentation"
						className={styles.whatsapp_get_started_link}
					>
						<IcCSendWhatsapp height="18px" width="18px" />
						<div className={styles.get_started_button}>Get Started</div>
					</div>
				)}
				<div className={styles.time_stamp}>{sentAt}</div>
			</div>
			<FooterItems
				response={response}
				sendFirebaseMessage={sendFirebaseMessage}
				sendMessageLoading={sendMessageLoading}
			/>
		</div>
	);
}
export default UserReceivedView;
