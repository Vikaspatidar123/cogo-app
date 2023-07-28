import { MESSAGE_MAPPING } from '../../../constants';
import renderText from '../../../helpers/templateTextFormatting';

import FileViewMapping from './fileViewMapping';
import styles from './styles.module.css';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function ShowMessage({ message, messageType = '' }) {
	let html = message.replace(GLOBAL_CONSTANTS.patterns.SLASH, '<br>') || '';

	if (messageType !== 'template') {
		html = renderText(html);
	}

	return <div className={styles.message_styles} dangerouslySetInnerHTML={{ __html: html }} />;
}
function MessageBody({ response = {}, message_type = 'text' }) {
	const { message = '', media_url = '' } = response;

	const fileExtension = media_url?.split('.').pop();
	const isMessageTypeMedia =		MESSAGE_MAPPING.media.includes(message_type) || false;

	if (isMessageTypeMedia) {
		return (
			<>
				<FileViewMapping
					mediaUrl={media_url}
					extension={fileExtension}
					messageType={message_type}
				/>
				<ShowMessage message={message} messageType={message_type} />
			</>
		);
	}

	return <ShowMessage message={message} messageType={message_type} />;
}

export default MessageBody;
