import {
	collection,
	query,
	where,
	limit,
	getDocs,
	doc,
	updateDoc,
} from 'firebase/firestore';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const PLATFORM_CHAT_PATH = GLOBAL_CONSTANTS.firebase_paths.platform_chat;

const WHATSAPP_PATH = GLOBAL_CONSTANTS.firebase_paths.whatsapp;

const syncUserRooms = async ({
	platformChatRoomId = '',
	firestore,
	preferredMobileNo,
}) => {
	const channelForWhatsapp = collection(firestore, WHATSAPP_PATH);
	const mobileNoQuery = query(
		channelForWhatsapp,
		where('mobile_no', '==', preferredMobileNo),
		limit(1),
	);

	const getWhatsappUser = await getDocs(mobileNoQuery);

	if (getWhatsappUser.size > 0) {
		const whatsappRoomId = getWhatsappUser?.docs?.[0]?.id;

		const userWhatsappRoom = doc(
			firestore,
			`${WHATSAPP_PATH}/${whatsappRoomId}`,
		);

		const userPlatformChatRoom = doc(
			firestore,
			`${PLATFORM_CHAT_PATH}/${platformChatRoomId}`,
		);

		const user_channel_ids = {
			whatsapp_id      : whatsappRoomId,
			platform_chat_id : platformChatRoomId,
		};

		await updateDoc(userWhatsappRoom, {
			user_channel_ids,
			updated_at: Date.now(),
		});

		await updateDoc(userPlatformChatRoom, {
			user_channel_ids,
			updated_at: Date.now(),
		});
	}
};

export default syncUserRooms;
