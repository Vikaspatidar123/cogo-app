import { isEmpty } from '@cogoport/utils';
import { collection, addDoc, updateDoc, doc, getDoc } from 'firebase/firestore';

import getFileAttributes from '../../../utils/getFileAttributes';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const PLATFORM_CHAT_PATH = GLOBAL_CONSTANTS.firebase_paths.platform_chat;

const useSendFirebaseMessage = ({
	firestore,
	roomId,
	sendMessageLoading,
	sendMessage,
}) => {
	const messageCollection = collection(
		firestore,
		`${PLATFORM_CHAT_PATH}/${roomId}/messages`,
	);

	const roomCollection = doc(firestore, `${PLATFORM_CHAT_PATH}/${roomId}`);

	const addMessageToFirestore = async (userChat) => {
		await addDoc(messageCollection, userChat);
		const userRoom = await getDoc(roomCollection);
		const oldCount = userRoom.data().new_message_count;

		updateDoc(roomCollection, {
			new_message_count         : oldCount + 1,
			last_message_document     : userChat,
			last_message              : userChat.response.message || '',
			has_admin_unread_messages : true,
			updated_at                : Date.now(),
			new_message_sent_at       : Date.now(),
		});
	};

	const sendFirebaseMessage = async ({
		message,
		buttonId = null,
		type = '',
		file = {},
		reset = () => {},
	}) => {
		if (sendMessageLoading || !(message || !isEmpty(file))) {
			return;
		}

		const newMessage = message.trim() || '';
		const { fileType = '', finalUrl = '' } = !isEmpty(file)
			? getFileAttributes({
				fileName : file?.name,
				finalUrl : file?.url,
			})
			: {};

		const userRoom = await getDoc(roomCollection);
		const roomSessionType = userRoom.data().session_type || 'bot';

		const userChat = {
			conversation_type : 'sent',
			message_type      : finalUrl ? fileType : type || 'text',
			response          : {
				message           : newMessage,
				media_url         : finalUrl || '',
				session_type      : roomSessionType,
				replied_button_id : buttonId,
			},
			created_at               : Date.now(),
			new_user_message_sent_at : Date.now(),
		};

		let messageMetaData = {
			btn_id       : buttonId || undefined,
			session_type : roomSessionType,
			message_type : type || 'text',
			text         : newMessage,
		};

		if (finalUrl) {
			messageMetaData = {
				...messageMetaData,
				message_type : fileType,
				text         : newMessage,
				media_url    : finalUrl,
			};
		}

		sendMessage({
			messageMetaData,
			updateFirestore: () => {
				addMessageToFirestore(userChat);
				reset();
			},
		});
	};

	return {
		sendFirebaseMessage,
	};
};
export default useSendFirebaseMessage;
