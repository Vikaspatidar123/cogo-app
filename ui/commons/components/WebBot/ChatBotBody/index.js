import { IcMRefresh } from '@cogoport/icons-react';
import React, { useCallback, useRef } from 'react';

import FooterChat from '../FooterChat';
import useGetMessages from '../hooks/useGetMessages';
import useSendFirebaseMessage from '../hooks/useSendFirebaseMessage';

import EachMessage from './EachMessage';
import styles from './styles.module.css';

import { Image } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function ChatBotBody({ firestore, roomId, sendMessage, sendMessageLoading }) {
	const refs = useRef({
		messageRef : null,
		messageEnd : null,
	});

	const scrollToBottom = useCallback(() => {
		refs.current.messageEnd?.scrollIntoView({ behavior: 'smooth' });
	}, []);

	const toggleHeight = ({ isFileDivPresent = false }) => {
		if (refs.current.messageRef !== null) {
			refs.current.messageRef.current.style.height = isFileDivPresent ? '70%' : '78%';
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
			<div className={styles.body_container} ref={refs.messageRef} onScroll={handleScroll}>
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
				<div ref={refs.messageEnd} />
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
