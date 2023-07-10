import { Modal } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState, useRef, useEffect } from 'react';

import useCreateTicketActivity from '../../../hooks/useCreateTicketActivity';
import useGetTicketActivity from '../../../hooks/useGetTicketActivity';
import useGetTicketDetails from '../../../hooks/useGetTicketDetails';

import ChatBody from './ChatBody';
import FooterChat from './FooterChat';
import ModalHeader from './ModalHeader';
import RateTicket from './RateTicket';
import styles from './styles.module.css';
import TicketSummary from './TicketSummary';

const STATUS = ['closed', 'rejected'];

const chatBodyHeight = (rating, ticketExists, status, file, uploading) => {
	if (!ticketExists) {
		return '100%';
	}
	if (STATUS.includes(status)) {
		if (rating || status === 'rejected') {
			return 'calc(100% - 62px)';
		}
		return 'calc(100% - 138px)';
	}
	if (isEmpty(file) && !uploading) {
		return 'calc(100% - 55px)';
	}
	return 'calc(100% - 84px)';
};

function TicketChat({ modalData = {}, setModalData = () => {} }) {
	const messageRef = useRef(null);
	const [file, setFile] = useState('');
	const [message, setMessage] = useState('');
	const [uploading, setUploading] = useState(false);

	const scrollToBottom = () => {
		setTimeout(() => {
			if (messageRef.current) {
				const { scrollHeight, clientHeight } = messageRef.current;
				const maxScrollTop = scrollHeight - clientHeight;
				messageRef.current.scrollTo({
					top      : maxScrollTop + 5,
					behavior : 'smooth',
				});
			}
		}, 300);
	};

	const {
		getTicketDetails = () => {},
		ticketData = '',
		detailsLoading,
	} = useGetTicketDetails({
		ticketId: modalData?.ticketId || '',
	});

	const { TicketFeedback: ticketFeedback = {}, Ticket: ticket = {} } =		ticketData || {};

	const { Rating: rating = 0 } = ticketFeedback || {};
	const { Status: status = '', ID: id = '' } = ticket || {};

	const {
		listData = {},
		chatLoading = false,
		getTicketActivity = () => {},
		setListData = () => {},
	} = useGetTicketActivity({
		ticketId: modalData?.ticketId || '',
	});

	const refetchTicket = () => {
		setListData({
			items       : [],
			page        : 0,
			total_pages : 0,
		});
		getTicketDetails();
		getTicketActivity(0);
	};

	const isEmptyChat = isEmpty(listData?.items || {});

	const { createTicketActivity = () => {}, createLoading = false } =	useCreateTicketActivity({
		ticketId: modalData?.ticketId || '',
		refetchTicket,
		scrollToBottom,
	});

	const handleSendComment = async () => {
		if ((message || !isEmpty(file)) && !createLoading) {
			await createTicketActivity({
				message,
				file,
			});
			setMessage('');
			setFile('');
		}
	};

	const handleKeyPress = (event) => {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			handleSendComment();
			scrollToBottom();
		}
	};

	const ticketExists = typeof ticketData === 'object' || false;

	const loading = chatLoading || createLoading;

	useEffect(() => {
		if (!isEmptyChat) {
			scrollToBottom();
		}
	}, [isEmptyChat]);

	return (
		<>
			<Modal.Header
				title={(
					<ModalHeader
						setModalData={setModalData}
						ticketData={ticketData}
						refetchTicket={refetchTicket}
						ticketExists={ticketExists}
					/>
				)}
			/>
			<Modal.Body className={styles.modal_body} key={loading}>
				<div
					className={styles.container}
					style={{
						height: chatBodyHeight(
							rating,
							ticketExists,
							status,
							file,
							uploading,
						),
					}}
				>
					<ChatBody
						listData={listData}
						modalData={modalData}
						chatLoading={chatLoading}
						messageRef={messageRef}
						getTicketActivity={getTicketActivity}
						ticketData={ticketData}
						ticketExists={ticketExists}
						setModalData={setModalData}
						detailsLoading={detailsLoading}
					/>
				</div>
				{ticketExists && (
					<div
						style={{
							background: STATUS.includes(status)
								? '#f4f4f4'
								: '#fff',
						}}
					>
						{STATUS.includes(status) ? (
							<RateTicket
								id={id}
								status={status}
								ticketRating={rating}
								refetchTicket={refetchTicket}
							/>
						) : (
							<FooterChat
								file={file}
								message={message}
								setFile={setFile}
								uploading={uploading}
								setMessage={setMessage}
								setUploading={setUploading}
								handleKeyPress={handleKeyPress}
								handleSendComment={handleSendComment}
							/>
						)}
					</div>
				)}
				{ticketExists && (
					<div className={styles.sub_modal_container}>
						<TicketSummary
							ticketDetails={ticketData?.Ticket}
							ticketExists={ticketExists}
						/>
					</div>
				)}
			</Modal.Body>
		</>
	);
}

export default TicketChat;
