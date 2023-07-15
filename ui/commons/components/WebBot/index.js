import { IcMCross } from '@cogoport/icons-react';
import { useEffect, useRef } from 'react';

import GLOBAL_CONSTANTS from '../../constants/globals';

import ChatBotBody from './ChatBotBody';
import styles from './styles.module.css';

const THRESHOLD_MESSAGE_COUNT = 99;

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
	}, [botRef, closeBot, isOpen]);

	return (
		<div ref={botRef}>
			<div className={styles.bot_icon} id="draggable_widget">
				{newMessageCount > 0 && (
					<div className={styles.no_of_messages}>
						{newMessageCount > THRESHOLD_MESSAGE_COUNT ? '99+' : newMessageCount}
					</div>
				)}
				<div className={createLoading ? styles.bot_container_disabled : styles.bot_container}>
					<div
						className={styles.bot_img}
						style={{ backgroundImage: `url(${GLOBAL_CONSTANTS.image_url.animated_web_bot})` }}
					/>
				</div>
			</div>
			{isOpen ? (
				<div className={styles.bot_card}>
					<div className={styles.bot_head}>
						<div className={styles.bot_head_img}>
							<div
								className={styles.image_bot}
								style={{ backgroundImage: `url(${GLOBAL_CONSTANTS.image_url.web_bot_icon})` }}
							/>
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
			) : null}
		</div>
	);
}

export default WebBot;
