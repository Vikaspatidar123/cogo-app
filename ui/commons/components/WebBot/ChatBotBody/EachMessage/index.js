import styles from './styles.module.css';
import UserReceivedView from './UserReceivedView';
import UserSentView from './UserSentView';

function EachMessage({ sendFirebaseMessage, eachMessage, sendMessageLoading }) {
	const { conversation_type = '' } = eachMessage || {};
	return conversation_type === 'received' ? (
		<div className={styles.parent_receive_div}>
			<UserReceivedView
				eachMessage={eachMessage}
				sendFirebaseMessage={sendFirebaseMessage}
				sendMessageLoading={sendMessageLoading}
			/>
		</div>
	) : (
		<div className={styles.parent_send_div}>
			<UserSentView eachMessage={eachMessage} />
		</div>
	);
}

export default EachMessage;
