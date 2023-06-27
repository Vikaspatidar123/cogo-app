import { getCookie } from '@cogoport/utils';
import { addDoc, doc, updateDoc, getDoc } from 'firebase/firestore';

import addInitialMessage from './addInitialMessage';
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

	const { platform_chat: PLATFORM_CHAT_PATH } = GLOBAL_CONSTANTS.firebase_paths;

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
		const roomInfo = {
			user_id,
			session_type           : 'bot',
			created_at             : Date.now(),
			updated_at             : Date.now(),
			user_name              : userName?.toUpperCase(),
			new_message_count      : 0,
			new_user_message_count : 0,
			last_message           : '',
			user_type              : isUnKnownUser ? 'public_app' : 'app',
			support_agent_id       : null,
			organization_id        : orgId,
			channel_type           : 'platform_chat',
			lead_user_id,
			new_message_sent_at    : Date.now(),
			spectators_ids         : [],
			spectators_data        : [],
			mobile_no              : preferredMobileNo,
			user_email,
			organization_name      : business_name,
			chat_tags              : [],
			chat_status            : '',
			user_details           : !isUnKnownUser ? userDetails : {},
			sender                 : getCookie('cogo_bot_token') || '',
			previous_tag           : 'new_user',
			previous_tag_count     : 0,
		};

		const newUserRoom = await addDoc(platformChatCollection, roomInfo);
		const { id = '' } = newUserRoom || {};

		if (id) {
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
		}
	};

	const updateRoom = async (room_id) => {
		const messageFireBase = doc(firestore, `${PLATFORM_CHAT_PATH}/${room_id}`);
		const getRoomData = await getDoc(messageFireBase);
		const { session_type = 'bot', user_channel_ids: userChannelId } =			getRoomData.data() || {};

		const userNameHash = name ? { user_name: name?.toUpperCase() } : {};
		let payload = {};

		if (user_id) {
			payload = {
				updated_at             : Date.now(),
				new_user_message_count : 0,
				mobile_no              : preferredMobileNo,
				user_email,
				organization_name      : business_name,
				user_id,
				organization_id        : orgId,
				lead_user_id,
				sender                 : getCookie('cogo_bot_token') || '',
				user_details           : !isUnKnownUser ? userDetails : {},
				session_type           : session_type === 'archived' ? 'bot' : session_type,
				...userNameHash,
			};
		} else {
			payload = {
				session_type           : session_type === 'archived' ? 'bot' : session_type,
				updated_at             : Date.now(),
				new_user_message_count : 0,
			};
		}

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
