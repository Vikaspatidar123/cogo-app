import MessageBody from '../MessageBody';

import styles from './styles.module.css';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import formatDate from '@/ui/commons/utils/formatDate';

function UserSentView({ eachMessage }) {
	const { response = {}, created_at, message_type } = eachMessage || {};
	const sentAt = formatDate({
		date       : new Date(created_at),
		dateFormat : GLOBAL_CONSTANTS.formats.date['hh:mm'],
		formatType : 'dateTime',
		separator  : ' ',
	});

	return (
		<div className={styles.user_chat}>
			<MessageBody response={response} message_type={message_type} />
			<div className={styles.time_stamp}>{sentAt}</div>
		</div>
	);
}
export default UserSentView;
