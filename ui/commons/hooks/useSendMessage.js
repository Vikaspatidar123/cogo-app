import { Toast } from '@cogoport/components';

import getApiErrorString from '@/packages/forms/utils/getApiError';
import { useRequest } from '@/packages/request';

const useSendMessage = ({
	user_id = null,
	lead_user_id = null,
	organization_id = null,
}) => {
	const [{ loading }, trigger] = useRequest(
		{ method: 'post', url: '/create_communication_platform_chat' },
		{ autoCancel: false },
	);

	const sendMessage = async ({
		messageMetaData,
		conversation_type = '',
		updateFirestore = () => {},
	}) => {
		let extraPayload = {};
		if (conversation_type === 'outward') {
			extraPayload = { user_id, lead_user_id, organization_id };
		} else {
			extraPayload = {
				sender_user_id      : user_id,
				sender_lead_user_id : lead_user_id,
			};
		}

		try {
			await trigger({
				data: {
					type              : 'platform_chat',
					message_metadata  : messageMetaData,
					service           : 'user',
					service_id        : process.env.NEXT_PUBLIC_COGOVERSE_ID,
					conversation_type : conversation_type || 'inward',
					source            : 'CogoOne:AppPlatform',
					...extraPayload,
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
export default useSendMessage;
