import { Textarea, Upload } from '@cogoport/components';
import {
	IcMSend,
	IcMAttach,
	IcMCross,
	IcMImage,
	IcMPdf,
} from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const uploadIcon = () => <IcMAttach className={styles.no_upload} />;

function FooterChat({
	setMessage = () => {},
	message = '',
	handleKeyPress = () => {},
	file,
	setFile = () => {},
	uploading = false,
	setUploading = () => {},
	handleSendComment = () => {},
}) {
	const handleChange = (obj) => {
		if (obj?.success) {
			setFile({ ...obj });
			setUploading(false);
		}
	};

	const handleProgress = (obj) => {
		if (obj?.type === 'progress') {
			setUploading(true);
		}
	};

	return (
		<>
			{(!isEmpty(file) || uploading) && (
				<div className={styles.file_div}>
					{uploading ? (
						<div className={styles.file_details}>Uploading....</div>
					) : (
						<div className={styles.file_details}>
							<div className={styles.file_icon_holder}>
								{file?.name.match(GLOBAL_CONSTANTS.regex.image_extension) ? (
									<IcMImage className={styles.image_preview} />
								) : (
									<IcMPdf className={styles.pdf_icon} />
								)}
							</div>
							<div className={styles.file_text}>{file?.name}</div>
							<IcMCross
								className={styles.delete_icon}
								onClick={() => setFile({})}
							/>
						</div>
					)}
				</div>
			)}
			<div className={styles.footer_container}>
				<div className={styles.bot_footer}>
					{!isEmpty(file) || uploading ? (
						<IcMAttach className={styles.no_upload} />
					) : (
						<Upload
							showProgress={false}
							hideUploadedList
							showIconAlways
							onProgress={handleProgress}
							onChange={handleChange}
							uploadIcon={uploadIcon}
							drag
						/>
					)}
					<Textarea
						className={styles.chat_input}
						placeholder="Type here ..."
						onChange={(val) => setMessage(val)}
						onKeyDown={(e) => handleKeyPress(e)}
						value={message}
					/>
					<IcMSend
						className={styles.send_icon}
						onClick={handleSendComment}
						cursor="pointer"
						fill="#EE3425"
					/>
				</div>
			</div>
		</>
	);
}

export default FooterChat;
