import useRequest from '@/utils/request/useRequest';
import { useSelector } from '@cogoport/front/store';
import { toast } from '@cogoport/front/components';

const useSendSupportChatMessages = () => {
	const {
		profile,
		general: { scope = '', query },
	} = useSelector((state) => state);
	const { trigger } = useRequest(
		'post',
		false,
		scope,
	)('/send_chatbot_messages');

	const sendMessagesInfo = async (
		room_id1,
		conversation_type1,
		channel1,
		session_type1,
		msg,
	) => {
		try {
			await trigger({
				data: {
					room_id: room_id1,
					conversation_type: conversation_type1,
					channel: channel1,
					session_type: session_type1,
					message: msg,
					partner_id: query.partner_id,
					user_id: profile.id,
					user_name: profile.name,
					organization_id:
						profile?.partner?.twin_importer_exporter_id ||
						profile?.partner?.twin_service_provider_id,
				},
			});
		} catch (error) {
			toast.error(error?.message || 'Unable to get information');
		}
	};

	return {
		trigger,
		sendMessagesInfo,
	};
};

export default useSendSupportChatMessages;
