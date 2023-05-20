import { Button, toast } from '@cogoport/front/components';
import styled from '@cogoport/front/styled';
import React from 'react';

import { resumeChat } from '../../Logic';

const Container = styled.div`
	border-top: 1px solid #e0e0e0;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: absolute;
	width: 95%;
	bottom: 0px;
	background: white;

	.core-ui-button-root {
		background-color: #4384f5;
		color: #fff;
		border-color: #4384f5;
		padding: 12px 16px;
		font-weight: 600px;
		height: auto;
		font-size: 14px;
		text-transform: capitalize;
	}
`;

function ResumeChat({ chatId, handleTabChange }) {
	const activateChat = async () => {
		try {
			await resumeChat(chatId);
			handleTabChange('chats');
		} catch (err) {
			toast.error(err?.payload?.error?.message);
		}
	};
	return (
		<Container>
			<p>This chat has been archived.</p>
			<Button type="button" onClick={activateChat}>
				Activate Chat
			</Button>
		</Container>
	);
}
export default ResumeChat;
