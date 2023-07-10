import { collection, addDoc } from 'firebase/firestore';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const PLATFORM_CHAT_PATH = GLOBAL_CONSTANTS.firebase_paths.platform_chat;

const getWelcomeMessage = (
	name,
) => `Hello, ${name} and welcome to cogoport! how can we assist you
today? please do not hesitate to let us know if you have any questions
or need help with anything.`;

const userWhatsappQR = {
	conversation_type : 'received',
	message_type      : 'image',
	response          : {
		whatsapp_get_started_link:
			GLOBAL_CONSTANTS.urls.whatsapp_get_started_link,
		message   : 'Scan using WhatsApp or click on button below',
		media_url : GLOBAL_CONSTANTS.image_url.whatsapp_qr,
	},
	created_at: Date.now(),
};

const whatsappQRMetadata = {
	whatsapp_get_started_link : GLOBAL_CONSTANTS.urls.whatsapp_get_started_link,
	message_type              : 'image',
	text                      : 'Scan using WhatsApp or click on button below',
	media_url                 : GLOBAL_CONSTANTS.image_url.whatsapp_qr,
};

const addInitialMessage = async ({ roomId, firestore, name, sendMessage }) => {
	const userMessageCollection = collection(
		firestore,
		`${PLATFORM_CHAT_PATH}/${roomId}/messages`,
	);

	const welcomeMessage = getWelcomeMessage(
		name === 'anonymous user' ? 'User' : name,
	);

	const userChat = {
		conversation_type : 'received',
		message_type      : 'text',
		response          : {
			message: welcomeMessage,
		},
		created_at: Date.now(),
	};

	await addDoc(userMessageCollection, userChat);

	await addDoc(userMessageCollection, userWhatsappQR);

	const messageMetaData = {
		message_type : 'text',
		text         : welcomeMessage,
	};

	sendMessage({
		messageMetaData,
		conversation_type: 'outward',
	});

	sendMessage({
		messageMetaData   : whatsappQRMetadata,
		conversation_type : 'outward',
	});
};

export default addInitialMessage;
