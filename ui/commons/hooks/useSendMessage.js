import { Toast } from '@cogoport/components';

import getPayloadForSendMessage from '../utils/getPayloadForSendMessage';

import getApiErrorString from '@/packages/forms/utils/getApiError';
import { useRequest } from '@/packages/request';

const useSendMessage = ({
	user_id = null,
	lead_user_id = null,
	organization_id = null,
}) => {
	const [{ loading }, trigger] = useRequest(
		{ method: 'post', url: '/create_communication_platform_chat' },
		{ autoCancel: false, manual: true },
	);

	const sendMessage = async ({
		messageMetaData = {},
		conversation_type = '',
		updateFirestore = () => {},
	}) => {
		const payload = getPayloadForSendMessage({
			conversation_type,
			user_id,
			lead_user_id,
			organization_id,
			messageMetaData,
		});

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
export default useSendMessage;
