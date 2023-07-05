import { Toast } from '@cogoport/components';
import { getCookie } from '@cogoport/utils';

import useLegacyRequest from '../utils/getCustomAxios';

import getApiErrorString from '@/packages/forms/utils/getApiError';

const getPayload = ({ conversation_type = '' }) => {
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
	return payload;
};

const usePublicSendMessage = () => {
	const [{ loading }, trigger] = useLegacyRequest({
		url    : 'communication/create_communication_public_platform_chat',
		method : 'post',
	});

	const sendMessage = async ({
		messageMetaData,
		conversation_type = '',
		updateFirestore = () => {},
	}) => {
		const payload = getPayload({ conversation_type });
		try {
			await trigger({
				data: {
					auth_token        : process.env.COGOVERSE_AUTH_TOKEN,
					type              : 'platform_chat',
					message_metadata  : messageMetaData,
					service           : 'user',
					conversation_type : conversation_type || 'inward',
					service_id        : process.env.COGOVERSE_ID,
					source            : 'CogoOne:PublicPlatform',
					...(payload || {}),
				},
			});
			updateFirestore();
		} catch (err) {
			Toast.error(
				getApiErrorString(err?.response?.data) || 'something went wrong!!',
			);
		}
	};

	return {
		sendMessage,
		loading,
	};
};

export default usePublicSendMessage;
