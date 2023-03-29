import React, { useRef, useEffect, useState } from 'react';
import styled from '@cogoport/front/styled';

// COMPONENTS:
import ChatForm from './Form';
import Message from '../Events/Message';
import SystemMessage from '../Events/SystemMessage';
import FilledForm from '../Events/FilledForm';
import ChatInstruction from './ChatInstruction';
import ResumeChat from './ResumeChat';
import DownloadChat from './DownloadChat';
import CustomerInfo from './CustomerInfo';

// STYLED COMPONENTS:
const Wrapper = styled.div`
	width: calc(100% - 220px);
	padding: 0.5rem 1rem;
	position: relative;
`;

const MessageWrapper = styled.div`
	overflow-y: auto;
	margin-top: 26px;
	height: 78%;

	& > .lc-card {
		background: blue;
		display: inline-block;
		margin-top: 0;
		margin-bottom: 1rem;
	}
`;

const Buttons = styled.div`
	display: flex;
	justify-content: flex-end;
	margin-bottom: 4px;
	position: absolute;
	top: 0px;
	right: 16px;
`;

/**
 * Display use details
 */
const ChatMessages = ({
	chatInfo,
	chatMessages,
	onlyMessages = false,
	handleTabChange = () => {},
}) => {
	const ref = useRef();

	const [userData, setUserData] = useState({});

	const getChatUser = (authorId) => {
		const chatUsers = chatInfo?.users;
		return chatUsers.find(({ id }) => id === authorId) || { type: 'customer' };
	};

	useEffect(() => {
		ref.current.scrollTo(0, ref.current.scrollHeight);
	}, [chatMessages]);

	return (
		<Wrapper>
			<Buttons>
				<CustomerInfo
					users={chatInfo?.users}
					setUserData={setUserData}
					userData={userData}
				/>
				<DownloadChat
					chatMessages={chatMessages}
					getChatUser={getChatUser}
					userData={userData}
				/>
			</Buttons>
			<MessageWrapper ref={ref} onlyMessages={onlyMessages}>
				{(chatMessages || []).map((message) => {
					const user = getChatUser(message.author_id);
					switch (message.type) {
						case 'message':
							return <Message key={message.id} message={message} user={user} />;
						case 'system_message':
							return <SystemMessage key={message.id} message={message} />;

						case 'filled_form':
							return <FilledForm key={message.id} message={message} />;
						case 'file':
							return <Message key={message.id} message={message} user={user} />;

						default:
							return null;
					}
				})}

				{chatInfo && chatMessages && !chatMessages.length && (
					<ChatInstruction />
				)}
			</MessageWrapper>

			{!onlyMessages && (
				<ChatForm
					chatId={(chatInfo && chatInfo.id) || null}
					userData={userData}
				/>
			)}
			{onlyMessages && (
				<ResumeChat
					chatId={(chatInfo && chatInfo.id) || null}
					handleTabChange={handleTabChange}
				/>
			)}
		</Wrapper>
	);
};

export default ChatMessages;
