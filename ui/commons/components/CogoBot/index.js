/* eslint-disable react-hooks/rules-of-hooks */
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth, signInWithCustomToken } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import React, { useState, useRef, useEffect } from 'react';
import Draggable from 'react-draggable';

import { firebaseConfig } from '../../configurations/FirebaseConfig';
import usePublicSendMessage from '../../hooks/usePublicSendMessage';
import useSendMessage from '../../hooks/useSendMessage';

import useFetchRoom from './hooks/useFetchRoom';
import styles from './styles.module.css';

import { useSelector } from '@/packages/store';
import BotIntelligence from '@/ui/commons/components/BotIntelligence';
import WebBot from '@/ui/commons/components/WebBot';

function CogoBot() {
	const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

	const { general, profile } = useSelector((state) => state);

	const [showIntelligence, setShowIntelligence] = useState(false);
	const [cogobotLoading, setCogobotLoading] = useState(true);
	const [cogoBotState, setCogoBotState] = useState({
		isOpen          : false,
		roomId          : '',
		newMessageCount : 0,
	});
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [createLoading, setCreateLoading] = useState(false);

	const isDraggingRef = useRef(false);
	const timeoutRef = useRef(false);

	const {
		name = null,
		id: userId = null,
		organization,
		lead_user_id = '',
	} = profile;

	const isUnKnownUser = !organization?.id;

	const onDrag = () => {
		isDraggingRef.current = true;
	};

	const { firestoreToken = '' } = general;

	useEffect(() => {
		if (process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
			const auth = getAuth();
			signInWithCustomToken(auth, firestoreToken).catch((error) => {
				console.log(error.message);
			});
		}
		setIsAuthenticated(true);
	}, [firestoreToken]);

	const firestore = getFirestore(app);

	const { isOpen, roomId, newMessageCount } = cogoBotState || {};

	const { sendMessage = () => {}, loading: sendMessageLoading } = isUnKnownUser
		? usePublicSendMessage()
		: useSendMessage({
			user_id         : userId,
			organization_id : organization?.id,
			lead_user_id,
		});

	const { toggleUserChat, mountCountSnapShot, closeBot } = useFetchRoom({
		firestore,
		profile,
		isUnKnownUser,
		setCogoBotState,
		isOpen,
		roomId,
		sendMessage,
		setShowIntelligence,
		setCogobotLoading,
	});

	const handleClick = async () => {
		if (!createLoading) {
			setCreateLoading(true);
			await toggleUserChat();
			setCreateLoading(false);
		}
	};

	const onStop = () => {
		if (!isDraggingRef.current) {
			handleClick();
		}
		isDraggingRef.current = false;
	};

	useEffect(() => {
		clearTimeout(timeoutRef?.current);
		if (isAuthenticated) {
			timeoutRef.current = setTimeout(mountCountSnapShot, 0);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAuthenticated]);

	const userName = name || 'anonymous user';

	if (cogobotLoading) {
		return null;
	}

	return (
		<Draggable onStop={onStop} onDrag={onDrag} handle="#draggable_widget">
			<div className={styles.bot_container}>
				<BotIntelligence
					showIntelligence={showIntelligence}
					setShowIntelligence={setShowIntelligence}
				/>
				<WebBot
					name={userName}
					roomId={roomId}
					userId={userId}
					sendMessage={sendMessage}
					firestore={firestore}
					closeBot={closeBot}
					newMessageCount={newMessageCount}
					sendMessageLoading={sendMessageLoading}
					isOpen={isOpen}
					createLoading={createLoading}
					setCogoBotState={setCogoBotState}
				/>
			</div>
		</Draggable>
	);
}

export default CogoBot;
