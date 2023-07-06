import { Textarea } from '@cogoport/components';
import {
	IcMSend,
	IcMAttach,
	IcMCross,
	IcMImage,
	IcMPdf,
} from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

import FileUploader from '@/packages/forms/Business/FileUploader';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const translationKey = 'common:components_header_tickets_details';

function FooterChat({
	setMessage = () => {},
	message = '',
	handleKeyPress = () => {},
	file,
	setFile = () => {},
	handleSendComment = () => {},
}) {
	const { t } = useTranslation(['common']);

	const handleChange = (obj) => {
		if (obj) {
			setFile(obj);
		}
	};

	const url_split = file ? file?.split('/') : [];
	const file_name = url_split?.[url_split.length - 1];

	return (
		<>
			{(!isEmpty(file)) && (
				<div className={styles.file_div}>
					<div className={styles.file_details}>
						<div className={styles.name_holder}>
							<div className={styles.file_icon_holder}>
								{file?.match(GLOBAL_CONSTANTS.regex.image_extension) ? (
									<IcMImage className={styles.pdf_icon} />
								) : (
									<IcMPdf className={styles.pdf_icon} />
								)}
							</div>
							<div className={styles.file_text}>{file_name}</div>
						</div>
						<IcMCross
							className={styles.delete_icon}
							onClick={() => setFile('')}
						/>
					</div>
				</div>
			)}
			<div className={styles.footer_container}>
				<div className={styles.bot_footer}>
					{!isEmpty(file) ? (
						<IcMAttach className={styles.no_upload} />
					) : (
						<div className={styles.uploader}>
							<FileUploader
								source="footer_chat"
								drag
								showProgress
								onlyURLOnChange
								onChange={handleChange}
								uploadType="aws"
								uploadIcon={(
									<IcMAttach className={styles.upload_styles} />
								)}
							/>
						</div>
					)}
					<Textarea
						className={styles.chat_input}
						placeholder={t(`${translationKey}_chat_placeholder`)}
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
