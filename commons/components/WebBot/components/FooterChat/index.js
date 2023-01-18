import React from 'react';
import { IcMAttach, IcMSend } from '@cogoport/icons-react';
import AwsUploader from '@/temp/form/components/Business/AwsUploader';
import {
	SendInput,
	BotFooter,
	FooterIcons,
	UploderBox,
	Container,
	AttachIcon,
} from '../styles';

function FooterChat({
	setMessage,
	message,
	handleKeyPress,
	SetChat,
	file,
	setFile,
	uploading,
	setUploading,
	activeChat,
}) {
	const uploadIcon = () => {
		return <IcMAttach />;
	};

	const handleChange = (obj) => {
		if (obj?.success) {
			setFile({ ...file, [activeChat]: obj });
			setUploading({ ...uploading, [activeChat]: false });
		}
	};

	const handleProgress = (obj) => {
		if (obj?.type === 'progress') {
			setUploading({ ...uploading, [activeChat]: true });
		}
	};

	return (
		<Container>
			<BotFooter isFile={file?.[activeChat] || uploading?.[activeChat]}>
				<FooterIcons>
					<UploderBox>
						{file?.[activeChat] || uploading?.[activeChat] ? (
							<AttachIcon className="no-upload" />
						) : (
							<AwsUploader
								showProgress={false}
								hideUploadedList
								showIconAlways
								onProgress={handleProgress}
								onChange={handleChange}
								uploadIcon={uploadIcon}
								drag
								accept="image/*,.pdf"
							/>
						)}
					</UploderBox>

					<SendInput
						placeholder="Type here ..."
						onChange={(e) => setMessage(e.target.value)}
						value={message}
						onKeyPress={(e) => handleKeyPress(e)}
					/>

					<IcMSend height={35} width={35} onClick={SetChat} />
				</FooterIcons>
			</BotFooter>
		</Container>
	);
}

export default FooterChat;
