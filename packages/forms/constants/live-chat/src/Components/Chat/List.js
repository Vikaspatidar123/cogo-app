import React from 'react';
import { Button, Avatar } from '@cogoport/front/components';
import styled from '@cogoport/front/styled';

const List = styled.div`
	width: 220px;
	border-right: 1px solid rgb(203, 212, 222);
	overflow-y: auto;
	display: flex;
	flex-direction: column;
	background-color: rgb(243, 247, 249);

	.core-ui-button-root {
		margin-bottom: 10px;
		height: auto;
		padding: 16px 0px;
		background: white;
		border: black;
		position: relative;
		border-top: 1px solid rgb(203, 212, 222);
		width: 100%;
		background-color: rgb(243, 247, 249);
		color: rgb(66, 77, 87);
		font-size: 15px;
		line-height: 1.4;
		display: inline-block;
		max-width: 100%;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow-wrap: normal;
		margin-bottom: 2px;
		font-weight: normal;
		text-transform: capitalize;
		display: flex;
		align-items: center;
		border-radius: 0px;
		:hover {
			box-shadow: none;
			background-color: rgb(225, 233, 236);
			transition: background-color 0.1s ease-in-out 0s;
		}
		::before {
			background-color: rgb(67, 132, 245);
			content: '';
			height: 100%;
			left: 0px;
			opacity: 0;
			position: absolute;
			top: 0px;
			width: 5px;
			visibility: hidden;
		}

		&.active {
			color: rgb(66, 77, 87);
			opacity: 1;
			background-color: rgb(225, 233, 236);
			::before {
				opacity: 1;
				visibility: visible;
			}
		}
	}

	.core-ui-avatar-root {
		height: 34px;
		width: 34px;
		margin-right: 8px;
		margin-left: 10px;
	}
	.core-ui-avatar-text {
		font-size: 16px;
	}
`;

const ChatList = ({ chatList, activeChatId, pickChat }) => {
	const isChats = chatList && !!chatList.length;
	return (
		<List>
			{isChats
				? chatList.map((chatItem) => {
						const chatId = chatItem.id;
						const threadId = chatItem.thread && chatItem.thread.id;
						const isActive =
							activeChatId === threadId || activeChatId === chatId;
						const customerName = chatItem?.users?.[0]?.name;
						const handleClick = () => pickChat(chatItem);
						return (
							<Button
								key={threadId + chatId}
								onClick={handleClick}
								className={isActive ? 'active' : ''}
								fullWidth
							>
								<Avatar name={customerName} />
								{customerName}
							</Button>
						);
				  })
				: null}
		</List>
	);
};

export default ChatList;
