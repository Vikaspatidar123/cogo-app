import { IcMRefresh } from '@cogoport/icons-react';
import React, { useRef } from 'react';

import FooterChat from '../FooterChat';
import useGetMessages from '../hooks/useGetMessages';
import useSendFirebaseMessage from '../hooks/useSendFirebaseMessage';

import EachMessage from './EachMessage';
import { BodyContainer, Loader } from './styles';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function ChatBotBody({ firestore, roomId, sendMessage, sendMessageLoading }) {
	const messagesEnd = useRef(null);
	const messagesRef = useRef(null);

	const scrollToBottom = () => {
		messagesEnd.current?.scrollIntoView({ behavior: 'smooth' });
	};

	const toggleHeight = ({ isFileDivPresent = false }) => {
		if (messagesRef.current) {
			messagesRef.current.style.height = isFileDivPresent ? '70%' : '78%';
		}
	};

	const { sendFirebaseMessage } = useSendFirebaseMessage({
		firestore,
		roomId,
		sendMessageLoading,
		sendMessage,
	});

	const {
		sortedMessageData = [],
		getPrevData,
		loading,
		isLastPageOfMessages,
		handleScroll,
	} = useGetMessages({ firestore, roomId, scrollToBottom });

	return (
		<>
			<BodyContainer ref={messagesRef} onScroll={handleScroll}>
				{!isLastPageOfMessages && (
					<Loader>
						{loading ? (
							<img src={GLOBAL_CONSTANTS.image_url.loader} alt="load" />
						) : (
							<IcMRefresh cursor="pointer" onClick={getPrevData} />
						)}
					</Loader>
				)}
				{sortedMessageData.map((eachMessage) => (
					<EachMessage
						key={eachMessage?.created_at}
						eachMessage={eachMessage}
						sendFirebaseMessage={sendFirebaseMessage}
						sendMessageLoading={sendMessageLoading}
					/>
				))}
				<div ref={messagesEnd} />
			</BodyContainer>
			<FooterChat
				sendMessageLoading={sendMessageLoading}
				sendFirebaseMessage={sendFirebaseMessage}
				toggleHeight={toggleHeight}
			/>
		</>
	);
}

export default ChatBotBody;
