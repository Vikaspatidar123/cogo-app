import styled from '@cogoport/front/styled';
import React from 'react';

const MessageWrapper = styled.div`
	position: relative;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: ${({ isCustomer }) => (isCustomer ? 'flex-start' : 'flex-end')};
`;

const MessageAuthor = styled.small`
	position: absolute;
	color: rgba(66, 77, 87, 0.8);
	top: -3px;
`;

const MessageText = styled.p`
	padding: 8px;
	background: ${({ isCustomer }) => (isCustomer ? '#f2f3f4' : '#427fe1')};
	color: ${({ isCustomer }) => (isCustomer ? 'rgb(66, 77, 87)' : 'white')};
	border: 1px solid rgba(0, 0, 0, 0.05);
	border-radius: ${({ isCustomer }) => (isCustomer ? '10px' : '10px 10px 0px 10px')};
`;

const MessageA = styled.a`
	margin: 8px 0px;
	display: block;
	padding: 8px;
	background: ${({ isCustomer }) => (isCustomer ? '#f2f3f4' : '#427fe1')};
	color: ${({ isCustomer }) => (isCustomer ? 'rgb(66, 77, 87)' : 'white')};
	border: 1px solid rgba(0, 0, 0, 0.05);
	border-radius: ${({ isCustomer }) => (isCustomer ? '10px' : '10px 10px 0px 10px')};
`;

function Message({ message, user }) {
	const userName = (user && user.name) || '';
	const isCustomer = user && user.type === 'customer';

	let text = message?.text;
	if (message.type === 'file') {
		text = message?.url;
	}

	return (
		<MessageWrapper isCustomer={isCustomer}>
			<MessageAuthor>{userName || 'Cogo'}</MessageAuthor>
			{message.type === 'file' || (message.text || '').includes('https://') ? (
				<MessageA
					href={message?.url || message?.text}
					isCustomer={isCustomer}
					target="_blank"
				>
					{text}
				</MessageA>
			) : (
				<MessageText isCustomer={isCustomer}>{text}</MessageText>
			)}
		</MessageWrapper>
	);
}

export default Message;
