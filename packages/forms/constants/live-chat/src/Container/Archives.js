import styled from '@cogoport/front/styled';
import React, { useEffect, useState } from 'react';

// COMPONENTS:
import ChatsList from '../Components/Chat/List';
import ChatMessages from '../Components/Chat/Messages';
import Loader from '../Components/Loader';
import { getChatThreads, getArchives } from '../Logic';

// STYLED COMPONENTS:
const Wrapper = styled.div`
	display: flex;
	height: 500px;
`;

/**
 * Displays archived chats
 */
function ArchivedChats({ handleTabChange }) {
	const [chatList, setChatList] = useState(null);
	const [chatInfo, setChatInfo] = useState(null);
	const [chatMessages, setChatMessages] = useState([]);

	const pickChat = (chatItem) => {
		const chatId = chatItem.id;
		const lastThreadId = chatItem.thread && chatItem.thread.id;

		getChatThreads(chatId, [lastThreadId]).then(({ threads }) => {
			setChatInfo({ ...chatItem, threads });
			if (threads.length) {
				const msgs = [];
				threads.forEach((thread) => {
					msgs.unshift(...thread.events);
				});
				setChatMessages(msgs);
			}
		});
	};

	useEffect(() => {
		let isMounted = true;

		getArchives().then(({ chats }) => {
			if (isMounted) {
				if (chats.length) pickChat(chats[0]);
				setChatList(chats);
			}
		});

		return () => {
			isMounted = false;
		};
	}, []);

	if (!chatList) return <Loader />;

	return (
		<Wrapper>
			<ChatsList
				chatList={chatList}
				activeChatId={chatInfo && chatInfo.threads && chatInfo.threads[0].id}
				pickChat={pickChat}
			/>
			<ChatMessages
				chatInfo={chatInfo}
				chatMessages={chatMessages}
				onlyMessages
				handleTabChange={handleTabChange}
			/>
		</Wrapper>
	);
}

export default ArchivedChats;
