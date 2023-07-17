import { startCase } from '@cogoport/utils';

import getUrlFormatedText from '../../../../../../utils/getUrlFormatedText';

import CustomFileDiv from './CustomFileDiv';
import styles from './styles.module.css';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import getFileAttributes from '@/ui/commons/utils/getFileAttributes';

function ShowMessage({ message = '', restData = {} }) {
	let newMessage = message.replace('<', '&lt;');

	Object.keys(restData || {}).forEach((itm) => {
		newMessage += `<br/>${startCase(itm)}: ${restData[itm]}`;
	});

	return (
		<div dangerouslySetInnerHTML={{ __html: getUrlFormatedText(newMessage) }} />
	);
}

function MessageBody({ message = '', mediaUrls = [], restData }) {
	return (
		<>
			<div>
				{(mediaUrls || []).map((mediaUrl = '') => {
					const urlArray = decodeURI(mediaUrl)?.split('/');
					const fileName = urlArray[(urlArray?.length || GLOBAL_CONSTANTS.zeroth_index) - 1] || '';
					const { fileType } = getFileAttributes({ fileName });

					return (
						<CustomFileDiv
							mediaUrl={mediaUrl}
							messageType={fileType}
							key={mediaUrl}
						/>
					);
				})}
			</div>
			<div className={styles.message_section}>
				<ShowMessage message={message} restData={restData} />
			</div>
		</>
	);
}

export default MessageBody;
