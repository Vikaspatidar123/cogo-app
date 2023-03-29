import React from 'react';
import styled from '@cogoport/front/styled';
import { formatDistanceToNow } from '@cogo/date';
import useStateCallBack from '@cogo/utils/useStateCallBack';
import { Button } from '@cogoport/front/components';

const Container = styled.div`
	display: flex;
`;

const DetailsToPrint = styled.div``;

const DownloadChat = ({ chatMessages, getChatUser, userData }) => {
	const [showQuote, setShowQuote] = useStateCallBack(false, () => {
		if (showQuote) {
			window.frames.print_frame.document.body.innerHTML =
				document.getElementById('chat-details').innerHTML;
			window.frames.print_frame.window.focus();
			window.frames.print_frame.window.print();
			setShowQuote(false);
		}
	});

	const filteredMessages = chatMessages.filter(
		(message) => message.type !== 'system_message',
	);

	const getElement = (item) => {
		if (item.type === 'file' || (item.text || '').includes('https://')) {
			return (
				<a style={{ fontWeight: 'bold' }} href={item?.url || item?.text}>
					{item?.text || item?.url}
				</a>
			);
		}
		return (
			<span style={{ fontWeight: 'bold' }}>{item?.text || item?.url}</span>
		);
	};
	const searchInfo = (userData.session_fields || []).find(
		(item) => !!item?.search_requirements,
	);
	return (
		<Container>
			<Button onClick={() => setShowQuote(true)}>Download Chat</Button>
			<iframe
				name="print_frame"
				width="0"
				height="0"
				frameBorder="0"
				src="about:blank"
				title="CogoQuote"
			/>
			{showQuote ? (
				<DetailsToPrint id="chat-details">
					<div>
						{filteredMessages.map((item) => {
							const user = getChatUser(item?.author_id) || {};
							return (
								<p
									style={{
										margin: 4,
										borderBottom: '1px solid #e0e0e0',
										paddingBottom: 4,
										background: user?.type === 'agent' ? '#fffff' : '#e0e0e0',
										backgroundColor:
											user?.type === 'agent' ? '#fffff' : '#e0e0e0',
									}}
								>
									<p style={{ margin: 0, marginBottom: 4, fontSize: 10 }}>
										{formatDistanceToNow(item?.created_at, { addSuffix: true })}
									</p>
									<span>{user.name || ''}</span> : {getElement(item)}
								</p>
							);
						})}
						{searchInfo ? (
							<p
								style={{
									margin: 4,
									borderBottom: '1px solid #e0e0e0',
									paddingBottom: 4,
									background: '#e0e0e0',
									backgroundColor: '#e0e0e0',
								}}
							>
								<span>Search Info</span> : {searchInfo?.search_requirements}
							</p>
						) : (
							''
						)}
					</div>
				</DetailsToPrint>
			) : null}
		</Container>
	);
};

export default DownloadChat;
