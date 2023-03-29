import React, { useEffect, useState } from 'react';
import styled from '@cogoport/front/styled';
import { getChatThreads, ChatSDK } from '../Logic';

// COMPONENTS:
import ChatsList from '../Components/Chat/List';
import ChatMessages from '../Components/Chat/Messages';
import Loader from '../Components/Loader';

// CUSTOM HOOKS:
import { useChatList, useChatMessages } from '../Hooks';

// STYLED COMPONENTS:
const Wrapper = styled.div`
	display: flex;
	height: 500px;
`;

/**
 * Display currently active agent's chats
 */
const ActiveChats = ({ activeTab }) => {
	const [isReady, setIsReady] = useState(false);
	const [chatInfo, setChatInfo] = useState({});
	const activeChatId = (chatInfo && chatInfo.id) || null;

	const { messages, setMessages } = useChatMessages(activeChatId, activeTab);

	const pickChat = (chatItem) => {
		if (!chatItem) {
			setMessages([]);
			setChatInfo({});
		} else {
			const chatId = chatItem.id;
			const chatLastThreadId =
				(chatItem.thread && chatItem.thread.id) ||
				chatItem.last_thread_summary.id;

			setChatInfo(chatItem);
			getChatThreads(chatId, [chatLastThreadId]).then(({ threads }) => {
				setChatInfo({ ...chatItem, threads });
				if (threads.length) {
					const msgs = [];
					threads.forEach((thread) => {
						msgs.unshift(...thread.events);
					});
					setMessages(msgs);
				}

				setIsReady(true);
			});
		}
	};

	const { chatList, setChatList } = useChatList(pickChat);

	useEffect(() => {
		let isMounted = true;

		if (activeTab === 'chats') {
			ChatSDK.getAgentDetails().then((data) => {
				if (isMounted && data && data.chats_summary) {
					const agentsActiveChats = data.chats_summary;
					if (agentsActiveChats.length) {
						setChatList(agentsActiveChats);
						pickChat(agentsActiveChats[0]);
					} else {
						setIsReady(true);
					}
				}
			});
		}

		return () => {
			isMounted = false;
		};
	}, [activeTab]);

	if (!isReady) return <Loader />;

	return (
		<Wrapper>
			<ChatsList
				chatList={chatList}
				activeChatId={activeChatId}
				pickChat={pickChat}
			/>
			<ChatMessages chatInfo={chatInfo} chatMessages={messages} />
		</Wrapper>
	);
};

export default ActiveChats;
