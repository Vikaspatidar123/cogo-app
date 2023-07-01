import { addDoc, doc, updateDoc, getDoc } from 'firebase/firestore';

import addInitialMessage from './addInitialMessage';
import getPayloadToUpdateRoom from './getPayloadToUpdateRoom';
import getRoomInfo from './getRoomInfo';
import syncUserRooms from './syncUserRooms';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const getOrgData = (organizations) => organizations.map(
	({
		business_name = '',
		id: orgId = '',
		account_type = '',
		registration_number = '',
	}) => ({
		organization_id: orgId,
		business_name,
		registration_number,
		account_type,
	}),
);

const getRoomHelpers = ({
	profile,
	firestore,
	isUnKnownUser,
	platformChatCollection,
	setCogoBotState,
	sendMessage,
}) => {
	const {
		name = null,
		id: user_id = null,
		email: user_email = '',
		mobile_number_eformat: mobile_no = '',
		whatsapp_number_eformat: whatsapp_no = '',
		lead_user_id = '',
		organization,
		organizations = [],
	} = profile;

	const {
		business_name = '',
		id: orgId = '',
		account_type = '',
		registration_number = '',
	} = organization || {};

	const PLATFORM_CHAT_PATH = GLOBAL_CONSTANTS.firebase_paths.platform_chat;

	const preferredMobileNo = whatsapp_no || mobile_no;

	const userDetails = {
		account_type,
		user_id,
		business_name,
		email           : user_email,
		name,
		organization_id : orgId,
		registration_number,
		organizations   : getOrgData(organizations || []) || [],
	};

	const createRoom = async () => {
		const userName = name || 'anonymous user';

		const roomInfo = getRoomInfo({
			userName,
			user_id,
			isUnKnownUser,
			orgId,
			lead_user_id,
			preferredMobileNo,
			user_email,
			userDetails,
			business_name,
		});

		const newUserRoom = await addDoc(platformChatCollection, roomInfo);
		const { id = '' } = newUserRoom || {};
		if (!id) return;

		setCogoBotState((p) => ({ ...p, roomId: id }));
		await addInitialMessage({
			roomId : id,
			firestore,
			name   : userName,
			sendMessage,
		});
		if (!isUnKnownUser) {
			syncUserRooms({ platformChatRoomId: id, firestore, preferredMobileNo });
		}
	};

	const updateRoom = async (room_id) => {
		const messageFireBase = doc(firestore, `${PLATFORM_CHAT_PATH}/${room_id}`);
		const getRoomData = await getDoc(messageFireBase);
		const { session_type = 'bot', user_channel_ids: userChannelId } =			getRoomData.data() || {};

		const userNameHash = name ? { user_name: name?.toUpperCase() } : {};

		const payload = getPayloadToUpdateRoom({
			session_type,
			userNameHash,
			user_id,
			isUnKnownUser,
			orgId,
			lead_user_id,
			preferredMobileNo,
			user_email,
			userDetails,
			business_name,
		});

		await updateDoc(messageFireBase, payload);

		if (!userChannelId?.whatsapp_id && !isUnKnownUser) {
			syncUserRooms({
				platformChatRoomId: room_id,
				firestore,
				preferredMobileNo,
			});
		}
	};

	return {
		updateRoom,
		createRoom,
	};
};

export default getRoomHelpers;
