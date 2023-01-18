import { IcMCross, IcMRefresh } from '@cogoport/icons-react';
import React, { useState, useRef, useEffect } from 'react';
import {
	collection,
	addDoc,
	startAfter,
	orderBy,
	limit,
	query,
	onSnapshot,
	updateDoc,
	doc,
	getDoc,
} from '@firebase/firestore';
import { useSelector } from '@cogoport/front/store';
import {
	BotBody,
	FileDetails,
	FileDiv,
	FileIconHolder,
	FileText,
	ImagePreview,
	LoadBtn,
	MessagesWithMenu,
	PDFIcon,
	ShowFile,
} from './styles';
import FooterChat from './FooterChat';
import ShowMessage from './ShowMessage';
import { firbaseChatBotPath } from '../hooks/FirebaseConfig';

function ChatBotBody({ firestore, roomId }) {
	const { general } = useSelector((state) => state);

	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState([]);
	const [file, setFile] = useState(null);
	const [uploading, setUploading] = useState({});

	const [firstDoc, setFirstDoc] = useState(null);
	const [lastDoc, setLastDoc] = useState(null);
	const [flag, setFlag] = useState(true);
	const [zflag, setZflag] = useState(true);

	const messagesfi = collection(
		firestore,
		`${firbaseChatBotPath}/${roomId}/messages`,
	);

	const activeChat = 'chat';
	const firebaseData = () => {
		const roomsQuery1 = query(
			messagesfi,
			orderBy('created_at', 'desc'),
			limit(20),
		);
		setFlag(true);
		onSnapshot(roomsQuery1, (querySnapshot) => {
			setFirstDoc(querySnapshot.docs[0]);
			setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
			const result1 = [];
			querySnapshot.forEach((docp) => {
				result1.unshift(docp.data());
			});
			setMessages(result1);
		});
	};

	// pagination data
	const onNextData = () => {
		const roomsQuery1 = query(
			messagesfi,
			orderBy('created_at', 'desc'),
			startAfter(lastDoc),
			limit(20),
		);

		if (!firstDoc || !lastDoc) {
			setFlag(false);
		} else {
			onSnapshot(roomsQuery1, (querySnapshot) => {
				if (querySnapshot.docs.length === 0) {
					setFlag(false);
				} else {
					setFirstDoc(querySnapshot.docs[0]);
					setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
					querySnapshot.forEach((mes) => {
						messages.unshift(mes.data());
					});
				}
			});
		}
	};

	useEffect(() => {
		if (roomId) {
			firebaseData();
		}
	}, [roomId]);

	const formatDate = (date) => {
		const h = `0${date.getHours()}`;
		const m = `0${date.getMinutes()}`;
		return `${h.slice(-2)}:${m.slice(-2)}`;
	};

	// scroll
	const messagesEnd = useRef(null);

	const scrollToBottom = () => {
		messagesEnd.current?.scrollIntoView({ behavior: 'smooth' });
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages, zflag]);

	const addtofirestore = async (userChat) => {
		await addDoc(messagesfi, userChat);
		const roomCollection = doc(firestore, `${firbaseChatBotPath}/${roomId}`);
		const doc1 = await getDoc(roomCollection);
		const old_count = doc1.data()?.new_message_count;
		await updateDoc(roomCollection, {
			new_message_count: old_count + 1,
			last_message: userChat.response.message,
			updated_at: Date.now(),
		});
	};

	const SetChat = () => {
		const newMessage = message.trim().toLowerCase();
		if (newMessage !== '' && roomId !== undefined) {
			const userChat = {
				conversation_type: 'sent',
				response: { message: newMessage },
				created_at: Date.now(),
				sent_at: formatDate(new Date()),
				route_page: general.unPrefixedPath,
				imgUrl:
					file?.[activeChat] &&
					file?.[activeChat]?.name.match(/\.(jpg|jpeg|png|gif|svg)$/i)
						? file?.[activeChat].url
						: '',
				pdfUrl:
					file?.[activeChat] && file?.[activeChat]?.name?.includes('pdf')
						? file?.[activeChat].url
						: '',
			};
			addtofirestore(userChat);
			setMessages([...messages, userChat]);
			setMessage('');
			setFile(null);
		}
		setFlag(true);
	};

	const ButtonReply = (ms) => {
		const newMessage = ms.trim().toLowerCase();
		if (newMessage !== '' && roomId !== undefined) {
			const userChat = {
				conversation_type: 'sent',
				response: { message: newMessage },
				created_at: Date.now(),
				sent_at: formatDate(new Date()),
			};
			addtofirestore(userChat);
			setMessages([...messages, userChat]);
			setMessage('');
		}
		setFlag(true);
	};

	const handleKeyPress = (event) => {
		if (event.key === 'Enter') {
			SetChat();
		}
	};

	return (
		<>
			<BotBody>
				{flag && (
					<LoadBtn>
						<IcMRefresh
							onClick={() => {
								onNextData();
							}}
						/>
					</LoadBtn>
				)}
				<MessagesWithMenu>
					{messages !== undefined && (
						<ShowMessage messages={messages} ButtonReply={ButtonReply} />
					)}
					<div ref={messagesEnd} />
				</MessagesWithMenu>
			</BotBody>
			<ShowFile appear={file?.[activeChat] || uploading?.[activeChat]}>
				{(file?.[activeChat] || uploading?.[activeChat]) && (
					<FileDiv>
						{uploading?.[activeChat] ? (
							<div>
								<FileText>Uploading....</FileText>
							</div>
						) : (
							<FileDetails>
								<FileIconHolder>
									{file?.[activeChat]?.name.match(
										/\.(jpg|jpeg|png|gif|svg)$/i,
									) && <ImagePreview />}
									{file?.[activeChat]?.name.includes('.pdf') && <PDFIcon />}
								</FileIconHolder>
								<div>
									<FileText>{file?.[activeChat]?.name}</FileText>
								</div>
								<IcMCross
									width={17}
									height={17}
									onClick={() => setFile({ ...file, [activeChat]: undefined })}
								/>
							</FileDetails>
						)}
					</FileDiv>
				)}
			</ShowFile>
			<FooterChat
				SetChat={SetChat}
				handleKeyPress={handleKeyPress}
				setMessage={setMessage}
				message={message}
				file={file}
				setFile={setFile}
				setZflag={setZflag}
				zflag={zflag}
				uploading={uploading}
				setUploading={setUploading}
				activeChat={activeChat}
			/>
		</>
	);
}
export default ChatBotBody;
