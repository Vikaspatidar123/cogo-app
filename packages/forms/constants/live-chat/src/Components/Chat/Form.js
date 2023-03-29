import React, { useState } from 'react';
import { Button, TextArea, toast } from '@cogoport/front/components';
import AwsUploader from '@cogo/smart-components/components/AwsUploader';
import styled from '@cogoport/front/styled';
import { ChatSDK } from '../../Logic';
import Emojis from './Emoji';

const Container = styled.div`
	border: 1px solid rgb(188, 198, 208);
	border-radius: 8px;
	position: relative;
	transition: background-color 0.2s ease 0s;
	background: rgb(255, 255, 255);
`;

const TextAreaWrap = styled.div`
	padding: 10px 12px 4px;

	.ui-textarea-root {
		border: none;
		:hover {
			border: none;
		}
	}
`;

export const ActionsWrap = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0px 12px 4px;

	.core-ui-button-root {
		background-color: #4384f5;
		color: #fff;
		border-color: #4384f5;
		height: auto;
		font-size: 15px;
		padding: 4px 16px;
		min-width: 32px;
		min-height: 32px;

		:disabled {
			opacity: 0.5;
		}
	}
`;

export const Row = styled.div`
	display: flex;
	align-items: center;
`;

const ChatForm = ({ chatId, userData }) => {
	const [inputValue, setInputValue] = useState('');
	const [uploadedFile, setUploadedFile] = useState('');
	const handleInputChange = ({ target }) => setInputValue(target.value);

	const handleUpload = (val) => {
		setUploadedFile(val);
	};

	const sendMessage = (e) => {
		e.preventDefault();
		let messageValue = inputValue;
		if (inputValue && uploadedFile) {
			messageValue = `${messageValue}\n ${uploadedFile}`;
		}
		if (!inputValue && uploadedFile) {
			messageValue = uploadedFile;
		}
		ChatSDK.sendMessage(chatId, messageValue);
		setInputValue('');
		setUploadedFile('');
	};

	const sendEmoji = (emoji) => {
		ChatSDK.sendMessage(chatId, emoji);
	};

	const searchInfo = (userData.session_fields || []).find(
		(item) => !!item?.search_requirements,
	);

	const sendSearchRequirements = (e) => {
		e.preventDefault();
		if (searchInfo) {
			ChatSDK.sendMessage(chatId, searchInfo?.search_requirements);
		} else {
			toast.error('No search requirments found');
		}
	};

	return (
		<Container style={{ width: '100%' }}>
			<TextAreaWrap>
				<TextArea
					disabled={!chatId}
					value={inputValue}
					id="chat-message"
					placeholder="Write message..."
					onChange={handleInputChange}
					rows={2}
					style={{ width: '100%', marginTop: 'auto' }}
				/>
			</TextAreaWrap>
			<ActionsWrap>
				<Row>
					<AwsUploader
						showUploadIcon={false}
						themeType="secondary text flat link"
						dragNDropText="Upload"
						onlyURLOnChange
						onChange={handleUpload}
						value={uploadedFile}
						showProgress={false}
					/>
					<Emojis onClick={sendEmoji} />
					{searchInfo ? (
						<Button
							onClick={sendSearchRequirements}
							style={{
								background: 'transparent',
								color: 'black',
								border: 'none',
								textTransform: 'initial',
							}}
						>
							Send Search
						</Button>
					) : null}
				</Row>
				<Button
					type="button"
					onClick={sendMessage}
					disabled={!inputValue && !uploadedFile}
				>
					Send
				</Button>
			</ActionsWrap>
		</Container>
	);
};

export default ChatForm;
