import { useState, useEffect } from 'react';
import { useSelector } from '@cogoport/front/store';
import { getApp, getApps, initializeApp } from 'firebase/app';
import {
	getFirestore,
	collection,
	query,
	where,
	limit,
	getDocs,
	addDoc,
	onSnapshot,
	doc,
	updateDoc,
} from 'firebase/firestore';
import { IcMCross } from '@cogoport/icons-react';
import CogoLogo from './icons/cogo-logo.svg';
import {
	BotIcon,
	BotCard,
	BotHead,
	HeaderIcons,
	BotHeadImg,
	BotName,
	NoOfMessages,
} from './styles';
import ChatBotBody from './components/chat';
import { firbaseChatBotPath, firebaseConfig } from './hooks/FirebaseConfig';

function AppBot() {
	const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
	const firestore = getFirestore(app);
	const { name, id: user_id, partner } = useSelector(({ profile }) => profile);
	const {
		entity_manager,
		twin_importer_exporter_id,
		twin_service_provider_id,
	} = partner || {};
	const { id: stakeholderId, name: agentName } = entity_manager || {};
	const [active, setActive] = useState(false);
	const load = false;
	const [roomId, setRoomId] = useState(null);
	const [messageCount, setMessageCount] = useState(0);

	const channelForChatBot = collection(firestore, firbaseChatBotPath);
	const roomsQuery = query(
		channelForChatBot,
		where('user_id', '==', user_id),
		limit(1),
	);

	const add_room_id = async () => {
		const docs = await getDocs(roomsQuery);

		docs.forEach((docp) => {
			setMessageCount(docp.data().new_message_count_user);
			setRoomId(docp.id);
		});
	};

	useEffect(() => {
		add_room_id();
		onSnapshot(roomsQuery, (querySnapshot) => {
			let result;
			querySnapshot.forEach((docp) => {
				result = docp.data().new_message_count_user;
			});
			setMessageCount(result);
		});
	}, []);

	const addInitialMessage = async (roomid) => {
		const roomFirestore = collection(
			firestore,
			`${firbaseChatBotPath}/${roomid}/messages`,
		);
		const userChat = {
			conversation_type: 'received',
			response: {
				message: `Hello, ${name} and welcome to cogoport! how can we assist you
			today? please do not hesitate to let us know if you have any questions
			or need help with anything.`,
			},
			created_at: Date.now(),
			imgUrl: '',
			pdfUrl: '',
		};
		await addDoc(roomFirestore, userChat);
	};

	const createRoom = async () => {
		const roomInfo = {
			user_id,
			session_type: 'admin',
			user_type: 'cp',
			created_at: Date.now(),
			updated_at: Date.now(),
			user_name: name,
			new_message_count: 0,
			new_message_count_user: 0,
			last_message: '',
			agent_id: stakeholderId,
			agent_name: agentName,
			organization_id:
				twin_importer_exporter_id || twin_service_provider_id || '',
			channel_type: 'chatbot',
		};
		const roomid = await addDoc(channelForChatBot, roomInfo);
		setRoomId(roomid.id);
		addInitialMessage(roomid.id);
	};

	const updateRoom = async (room_id) => {
		const messageFireBase = doc(firestore, `${firbaseChatBotPath}/${room_id}`);
		await updateDoc(messageFireBase, {
			updated_at: Date.now(),
			user_name: name,
			agent_id: stakeholderId,
			agent_name: agentName,
			organization_id:
				twin_importer_exporter_id || twin_service_provider_id || '',
			new_message_count_user: 0,
		});
	};

	const openBot = async () => {
		if (active) {
			setActive(false);
		} else {
			const docs = await getDocs(roomsQuery);

			if (docs.size === 0) {
				createRoom();
			}
			setActive(true);
			if (roomId != null) {
				updateRoom(roomId);
			}
		}
	};
	return (
		<>
			<BotIcon onClick={openBot}>
				{messageCount > 0 && <NoOfMessages>{messageCount}</NoOfMessages>}
				<CogoLogo />
			</BotIcon>
			{active && (
				<BotCard className={active ? 'active_all' : ''}>
					<BotHead>
						<BotHeadImg>
							<CogoLogo />
							<BotName>Cogo Assist</BotName>
						</BotHeadImg>

						<HeaderIcons>
							<IcMCross onClick={openBot} />
						</HeaderIcons>
					</BotHead>
					{!load && roomId && (
						<ChatBotBody
							firestore={firestore}
							name={name}
							roomId={roomId}
							userId={user_id}
						/>
					)}
				</BotCard>
			)}
		</>
	);
}

export default AppBot;
