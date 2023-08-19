import { Popover, Textarea } from '@cogoport/components';
import { IcMAttach, IcMCross, IcMHappy, IcMSend } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import useGetEmojiList from '../../../hooks/useGetEmojiList';
import getFileAttributes from '../../../utils/getFileAttributes';

import EmojisBody from './EmojisBody';
import styles from './styles.module.css';

import { UploadController, useForm } from '@/packages/forms';
import { Image } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function FooterChat({ sendMessageLoading, sendFirebaseMessage, toggleHeight }) {
	const [messageData, setMessageData] = useState({
		message       : '',
		file          : {},
		uploadingFile : false,
	});

	const { control } = useForm();

	const {
		emojisList = {},
		setOnClicked = () => {},
		onClicked,
	} = useGetEmojiList();

	const handleChange = (obj) => {
		if (isEmpty(obj)) {
			return;
		}
		setMessageData((item) => ({
			...item,
			uploadingFile : false,
			file          : {
				name : obj?.split('/')?.slice(-1)?.join(''),
				url  : obj,
			},
		}));
		toggleHeight({ isFileDivPresent: true });
	};

	const handleProgress = (obj) => {
		if (obj.type !== 'progress') {
			return;
		}
		setMessageData((data) => ({
			...data,
			uploadingFile: true,
		}));
		toggleHeight({ isFileDivPresent: false });
	};

	const setEmojis = (val) => {
		setMessageData((data) => ({ ...data, message: `${data.message || ''}${val}` }));
	};

	const { file = {}, uploadingFile = false, message = '' } = messageData || {};

	const handleSend = () => {
		sendFirebaseMessage({
			message,
			type  : 'text',
			file,
			reset : () => {
				setMessageData({
					message       : '',
					file          : {},
					uploadingFile : false,
				});
				toggleHeight({ isFileDivPresent: false });
			},
		});
	};

	const handleKeyPress = (event) => {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			handleSend();
		}
	};

	const { fileIcon } = getFileAttributes({
		fileName : file?.name,
		finalUrl : file?.url,
	});

	return (
		<>
			<div
				className={(uploadingFile || !isEmpty(file)) ? styles.show_file : styles.hide_file}
			>
				{uploadingFile && <div className={styles.uploading_text}>uploading</div>}
				{!isEmpty(file) && (
					<div className={styles.uploaded_file}>
						{fileIcon}
						<div className={styles.file_name}>{file?.name}</div>
						<IcMCross
							onClick={() => {
								setMessageData((data) => ({
									...data,
									file: {},
								}));
								toggleHeight({ isFileDivPresent: false });
							}}
							className={styles.cross_icon}
						/>
					</div>
				)}
			</div>
			<div className={styles.footer_container}>
				{!isEmpty(file) || uploadingFile ? (
					<IcMAttach className={styles.uploaded_icon} />
				) : (
					<UploadController
						showProgress={false}
						hideUploadedList
						showIconAlways
						handleProgress={handleProgress}
						handleChange={(e) => handleChange(e)}
						uploadIcon={<IcMAttach className={styles.uploaded_icon} />}
						drag
						name="attachment_uploader"
						control={control}
						type="button"
					/>
				)}
				<Popover
					animation="shift-away"
					placement="top"
					content={(
						<EmojisBody
							emojisList={emojisList}
							setOnClicked={setOnClicked}
							updateMessage={setEmojis}
						/>
					)}
					visible={onClicked}
					maxWidth={355}
					onClickOutside={() => setOnClicked(false)}
				>
					<IcMHappy onClick={() => setOnClicked((prev) => !prev)} className={styles.happy_icon} />
				</Popover>
				<div className={styles.text_wrapper}>
					<Textarea
						placeholder="Type here ..."
						onChange={(e) => setMessageData((data) => ({
							...data,
							message: e || '',
						}))}
						onKeyDown={handleKeyPress}
						value={message}
						rows="1"
						cols="50"
					/>
				</div>
				<div className={styles.send}>
					{!sendMessageLoading ? (
						<IcMSend
							onClick={handleSend}
							width={20}
							height={20}
							style={{
								cursor: (message || !isEmpty(file)) ? 'pointer' : 'not-allowed',
							}}
						/>
					) : (
						<Image
							src={GLOBAL_CONSTANTS.image_url.loader}
							alt="loading"
							width={20}
							height={20}
						/>
					)}
				</div>
			</div>
		</>
	);
}
export default FooterChat;
