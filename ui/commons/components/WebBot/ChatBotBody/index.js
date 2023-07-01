import { IcMRefresh } from '@cogoport/icons-react';
import Image from 'next/image';
import React, { useRef } from 'react';

import FooterChat from '../FooterChat';
import useGetMessages from '../hooks/useGetMessages';
import useSendFirebaseMessage from '../hooks/useSendFirebaseMessage';

import EachMessage from './EachMessage';
import styles from './styles.module.css';

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
			<div className={styles.body_container} ref={messagesRef} onScroll={handleScroll}>
				{!isLastPageOfMessages && (
					<div className={styles.loader}>
						{loading ? (
							<Image src={GLOBAL_CONSTANTS.image_url.loader} alt="load" width={20} height={20} />
						) : (
							<IcMRefresh onClick={getPrevData} className={styles.refresh} />
						)}
					</div>
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
			</div>
			<FooterChat
				sendMessageLoading={sendMessageLoading}
				sendFirebaseMessage={sendFirebaseMessage}
				toggleHeight={toggleHeight}
			/>
		</>
	);
}

export default ChatBotBody;
