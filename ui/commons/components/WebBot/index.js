import { IcMCross } from '@cogoport/icons-react';
import { useEffect, useRef } from 'react';

import ChatBotBody from './ChatBotBody';
import styles from './styles.module.css';

function WebBot({
	roomId,
	sendMessage,
	firestore,
	newMessageCount,
	isOpen,
	closeBot,
	sendMessageLoading,
	createLoading,
}) {
	const botRef = useRef(null);

	useEffect(() => {
		function handleClickOutside(event) {
			if (isOpen && botRef.current && !botRef.current.contains(event.target)) {
				closeBot();
			}
		}
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [botRef]);

	return (
		<div ref={botRef}>
			<div className={styles.bot_icon} id="draggable_widget">
				{newMessageCount > 0 && (
					<div className={styles.no_of_messages}>
						{newMessageCount > 99 ? '99+' : newMessageCount}
					</div>
				)}
				<div className={createLoading ? styles.bot_container_disabled : styles.bot_container}>
					<div className={styles.bot_img} />
				</div>
			</div>
			{isOpen && (
				<div className={styles.bot_card}>
					<div className={styles.bot_head}>
						<div className={styles.bot_head_img}>
							<div className={styles.image_bot} />
							<div className={styles.bot_name}>Cogo</div>
						</div>
						<div className={styles.header_icons}>
							<IcMCross onClick={closeBot} />
						</div>
					</div>
					<ChatBotBody
						firestore={firestore}
						roomId={roomId}
						sendMessage={sendMessage}
						sendMessageLoading={sendMessageLoading}
					/>
				</div>
			)}
		</div>
	);
}

export default WebBot;
