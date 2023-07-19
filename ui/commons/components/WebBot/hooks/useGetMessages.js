import {
	onSnapshot,
	query,
	orderBy,
	limit,
	where,
	getDocs,
	collection,
} from 'firebase/firestore';
import { useState, useEffect, useRef, useCallback } from 'react';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const PAGE_LIMIT = 10;

const TIME_TO_SCROLL = 100;

const PLATFORM_CHAT_PATH = GLOBAL_CONSTANTS.firebase_paths.platform_chat;

const DECREMENT_VALUE = 1;

const useGetMessages = ({ firestore, roomId, scrollToBottom }) => {
	const [messagesState, setMessagesState] = useState({
		messagesHash          : {},
		lastDocumentTimeStamp : null,
		islastPage            : true,
	});
	const [loading, setLoading] = useState(false);
	const latestMessages = useRef(null);

	const mountSnapShot = useCallback(() => {
		const messagesCollection = collection(
			firestore,
			`${PLATFORM_CHAT_PATH}/${roomId}/messages`,
		);

		const chatCollectionQuery = query(
			messagesCollection,
			where('conversation_type', 'in', ['sent', 'received']),
			orderBy('created_at', 'desc'),
			limit(PAGE_LIMIT),
		);
		latestMessages.current = onSnapshot(
			chatCollectionQuery,
			(querySnapshot) => {
				const lastDocumentTimeStamp = querySnapshot.docs[querySnapshot.docs.length
					- DECREMENT_VALUE]?.data()?.created_at;
				const islastPage = querySnapshot.docs.length < PAGE_LIMIT;
				let prevMessageData = {};
				querySnapshot.forEach((eachMessage) => {
					const timeStamp = eachMessage.data()?.created_at;
					prevMessageData = {
						...prevMessageData,
						[timeStamp]: eachMessage.data(),
					};
				});
				setMessagesState((p) => ({
					...p,
					messagesHash: prevMessageData,
					islastPage,
					lastDocumentTimeStamp,
				}));
				setTimeout(scrollToBottom, TIME_TO_SCROLL);
			},
		);
	}, [firestore, roomId, scrollToBottom]);

	const { messagesHash = {}, islastPage: isLastPageOfMessages } =		messagesState || {};

	const getPrevData = async () => {
		if (loading || isLastPageOfMessages) {
			return;
		}
		const prevTimeStamp = Number(messagesState?.lastDocumentTimeStamp);

		const messagesCollection = collection(
			firestore,
			`${PLATFORM_CHAT_PATH}/${roomId}/messages`,
		);

		const chatCollectionQuery = query(
			messagesCollection,
			where('conversation_type', 'in', ['sent', 'received']),
			where('created_at', '<', prevTimeStamp),
			orderBy('created_at', 'desc'),
			limit(PAGE_LIMIT),
		);

		setLoading(true);
		const prevMessagesPromise = await getDocs(chatCollectionQuery);
		const prevMessages = prevMessagesPromise?.docs;
		const lastDocumentTimeStamp = prevMessages[(prevMessages?.length
			|| GLOBAL_CONSTANTS.zeroth_index) - DECREMENT_VALUE]?.data()?.created_at;
		const islastPage = prevMessages?.length < PAGE_LIMIT;
		let prevMessageData = {};
		prevMessages.forEach((eachMessage) => {
			const timeStamp = eachMessage.data()?.created_at;
			prevMessageData = { ...prevMessageData, [timeStamp]: eachMessage.data() };
		});
		setMessagesState((p) => ({
			...p,
			messagesHash: { ...(p.messagesHash || {}), ...prevMessageData },
			lastDocumentTimeStamp,
			islastPage,
		}));
		setLoading(false);
	};

	const handleScroll = (e) => {
		const bottom = e.target.scrollTop === 0;
		if (bottom) {
			getPrevData();
		}
	};

	useEffect(() => {
		// latestMessages?.current?.();
		mountSnapShot();
		return () => {
			latestMessages?.current?.();
		};
	}, [mountSnapShot]);

	const sortedMessageData = Object.keys(messagesHash || {})
		.sort((a, b) => Number(a) - Number(b))
		.map((eachkey) => messagesHash[eachkey]) || [];

	return {
		sortedMessageData,
		getPrevData,
		loading,
		isLastPageOfMessages,
		handleScroll,
	};
};
export default useGetMessages;
