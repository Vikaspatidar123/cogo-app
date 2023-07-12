import { getCookie, setCookie, deleteCookie } from '@cogoport/utils';
import {
	collection,
	query,
	where,
	limit,
	getDocs,
	onSnapshot,
	doc,
	updateDoc,
} from 'firebase/firestore';
import { useRef } from 'react';
import { v1 as uuid } from 'uuid';

import getRoomHelpers from '../helpers/roomHelpers';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const PLATFORM_CHAT_PATH = GLOBAL_CONSTANTS.firebase_paths.platform_chat;

const useFetchRoom = ({
	firestore,
	profile,
	isUnKnownUser,
	setCogoBotState,
	roomId,
	sendMessage,
	setCogobotLoading,
	isOpen,
}) => {
	const snapshotRef = useRef(null);

	const platformChatCollection = collection(firestore, PLATFORM_CHAT_PATH);

	const { updateRoom, createRoom } = getRoomHelpers({
		profile,
		firestore,
		isUnKnownUser,
		platformChatCollection,
		setCogoBotState,
		sendMessage,
	});

	const {
		name = null,
		id: user_id = null,
		organization,
		email: user_email = '',
		mobile_number_eformat: mobile_no = '',
		whatsapp_number_eformat: whatsapp_no = '',
		lead_user_id = '',
	} = profile;

	const preferredMobileNo = whatsapp_no || mobile_no;

	const { business_name: organization_name = '', id: orgId = '' } = organization || {};

	const getRoomId = async ({ tokenQuery, roomsQuery }) => {
		const existingUserRoom = await getDocs(roomsQuery);

		if (existingUserRoom.size === 0 && user_id) {
			const fetchTokenRoom = await getDocs(tokenQuery);

			if (fetchTokenRoom.size > 0) {
				const tokenRoom = fetchTokenRoom?.docs?.[GLOBAL_CONSTANTS.zeroth_index] || {};
				const tokenRoomId = tokenRoom?.id;
				try {
					const tokenRoomDoc = doc(
						firestore,
						`${PLATFORM_CHAT_PATH}/${tokenRoomId}`,
					);

					await updateDoc(tokenRoomDoc, {
						updated_at      : Date.now(),
						mobile_no       : preferredMobileNo,
						user_email,
						organization_name,
						user_name       : name || 'anonymous user',
						user_id,
						organization_id : orgId,
						lead_user_id,
					});
					deleteCookie('cogo_bot_token');
				} catch (e) {
					console.error('firebaseError:', e);
				}
			}
		}
		const getUpdatedRoom = await getDocs(roomsQuery);
		const roomDoc = getUpdatedRoom?.docs?.[0];
		setCogoBotState((p) => ({ ...p, roomId: roomDoc?.id }));
	};

	const mountCountSnapShot = async () => {
		snapshotRef?.current?.();
		let cogoBotToken = getCookie('cogo_bot_token') || '';

		if (!cogoBotToken) {
			cogoBotToken = uuid();
			setCookie('cogo_bot_token', cogoBotToken);
		}

		const tokenQuery = query(
			platformChatCollection,
			where('sender', '==', cogoBotToken),
			limit(1),
		);

		const roomsQuery = isUnKnownUser
			? tokenQuery
			: query(
				platformChatCollection,
				where('user_id', '==', user_id),
				limit(1),
			);

		await getRoomId({ tokenQuery, roomsQuery, cogoBotToken });

		setCogobotLoading(false);
		snapshotRef.current = onSnapshot(roomsQuery, (querySnapshot) => {
			const newMessageCount =	querySnapshot?.docs?.[0]?.data()?.new_user_message_count;
			setCogoBotState((p) => ({ ...p, newMessageCount }));
		});
	};

	const closeBot = async () => {
		setCogoBotState((p) => ({ ...p, isOpen: false }));
		const messageFireBase = doc(firestore, `${PLATFORM_CHAT_PATH}/${roomId}`);
		updateDoc(messageFireBase, {
			new_user_message_count: 0,
		});
	};

	const toggleUserChat = async () => {
		// setShowIntelligence(false);
		if (!isOpen) {
			if (!roomId) {
				await createRoom();
			} else {
				await updateRoom(roomId);
			}
			setCogoBotState((p) => ({ ...p, isOpen: true }));
		} else {
			closeBot();
		}
	};

	return {
		toggleUserChat,
		mountCountSnapShot,
		closeBot,
	};
};
export default useFetchRoom;
