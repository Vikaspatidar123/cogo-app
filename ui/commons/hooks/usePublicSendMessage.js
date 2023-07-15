import { Toast } from '@cogoport/components';

import useLegacyRequest from '../utils/getCustomAxios';
import getPayloadForPublicSendMessage from '../utils/getPayloadForPublicSendMessage';

import getApiErrorString from '@/packages/forms/utils/getApiError';

const usePublicSendMessage = () => {
	const getPayload = getPayloadForPublicSendMessage();

	const [{ loading }, trigger] = useLegacyRequest({
		url    : 'communication/create_communication_public_platform_chat',
		method : 'post',
	});

	const sendMessage = async ({
		messageMetaData,
		conversation_type = '',
		updateFirestore = () => {},
	}) => {
		const payload = getPayload({ conversation_type, messageMetaData });
		try {
			await trigger({
				data: payload,
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
