import { Popover, Textarea, Upload } from '@cogoport/components';
import { IcMAttach, IcMCross, IcMHappy, IcMSend } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import useGetEmojiList from '../../../hooks/useGetEmojiList';
import getFileAttributes from '../../../utils/getFileAttributes';

import EmojisBody from './EmojisBody';
import styles from './styles.module.css';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const getUploadIcon = () => <IcMAttach className={styles.uploaded_icon} />;

function FooterChat({ sendMessageLoading, sendFirebaseMessage, toggleHeight }) {
	const [messageData, setMessageData] = useState({
		message       : '',
		file          : {},
		uploadingFile : false,
	});

	const handleChange = (obj) => {
		if (obj?.success) {
			setMessageData((p) => ({
				...p,
				uploadingFile : false,
				file          : obj,
			}));
			return;
		}
		toggleHeight({ isFileDivPresent: false });
	};

	const handleProgress = (obj) => {
		if (obj?.type === 'progress') {
			setMessageData((p) => ({
				...p,
				uploadingFile: true,
			}));
			toggleHeight({ isFileDivPresent: true });
		}
	};

	const setEmojis = (val) => {
		setMessageData((p) => ({ ...p, message: `${p.message || ''}${val}` }));
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

	const {
		emojisList = {},
		setOnClicked = () => {},
		onClicked,
	} = useGetEmojiList();

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
								setMessageData((p) => ({
									...p,
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
					<Upload
						showProgress={false}
						hideUploadedList
						showIconAlways
						onProgress={handleProgress}
						onChange={handleChange}
						uploadIcon={getUploadIcon}
						drag
					/>
				)}
				<Popover
					theme="light"
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
					<IcMHappy onClick={() => setOnClicked((p) => !p)} className={styles.happy_icon} />
				</Popover>
				<div className={styles.text_wrapper}>
					<Textarea
						placeholder="Type here ..."
						onChange={(e) => setMessageData((p) => ({
							...p,
							message: e?.target?.value || '',
						}))}
						onKeyPress={(e) => handleKeyPress(e)}
						value={message}
						rows="2"
						cols="50"
					/>
				</div>
				{!sendMessageLoading ? (
					<IcMSend
						onClick={handleSend}
						disable={!(message || !isEmpty(file))}
					/>
				) : (
					<img src={GLOBAL_CONSTANTS.image_url.loader} alt="loading" className={styles.loading} />
				)}
			</div>
		</>
	);
}
export default FooterChat;
