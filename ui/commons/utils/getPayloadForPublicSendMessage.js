import { getCookie } from '@cogoport/utils';

const getPayloadForPublicSendMessage = () => {
	const getPayload = ({ conversation_type = '', messageMetaData }) => {
		const sender = getCookie('cogo_bot_token') || '';

		let payload = {};
		if (conversation_type === 'outward') {
			payload = {
				sender_user_id : process.env.COGOVERSE_ID,
				recipient      : sender,
			};
		} else {
			payload = {
				sender,
			};
		}
		return {
			auth_token        : process.env.COGOVERSE_AUTH_TOKEN,
			type              : 'platform_chat',
			message_metadata  : messageMetaData,
			service           : 'user',
			conversation_type : conversation_type || 'inward',
			service_id        : process.env.COGOVERSE_ID,
			source            : 'CogoOne:PublicPlatform',
			...(payload || {}),
		};
	};

	return getPayload;
};

export default getPayloadForPublicSendMessage;
