const getPayloadForSendMessage = ({
	conversation_type,
	user_id = null,
	lead_user_id = null,
	organization_id = null,
	messageMetaData,
}) => {
	let extraPayload = {};
	if (conversation_type === 'outward') {
		extraPayload = { user_id, lead_user_id, organization_id };
		return null;
	}
	extraPayload = {
		sender_user_id      : user_id,
		sender_lead_user_id : lead_user_id,
	};

	return {
		type              : 'platform_chat',
		message_metadata  : messageMetaData,
		service           : 'user',
		service_id        : process.env.NEXT_PUBLIC_COGOVERSE_ID,
		conversation_type : conversation_type || 'inward',
		source            : 'CogoOne:AppPlatform',
		...extraPayload,
	};
};

export default getPayloadForSendMessage;
