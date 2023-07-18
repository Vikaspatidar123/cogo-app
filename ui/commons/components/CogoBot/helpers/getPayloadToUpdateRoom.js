import { getCookie } from '@cogoport/utils';

const getPayloadToUpdateRoom = ({
	session_type,
	userNameHash,
	user_id,
	isUnKnownUser,
	orgId,
	lead_user_id,
	preferredMobileNo,
	user_email,
	userDetails,
	business_name,
}) => {
	if (user_id) {
		return {
			updated_at             : Date.now(),
			new_user_message_count : 0,
			mobile_no              : preferredMobileNo,
			user_email,
			organization_name      : business_name,
			user_id,
			organization_id        : orgId,
			lead_user_id,
			sender                 : getCookie('cogo_bot_token') || '',
			user_details           : !isUnKnownUser ? userDetails : {},
			session_type           : session_type === 'archived' ? 'bot' : session_type,
			...userNameHash,
		};
	}
	return {
		session_type           : session_type === 'archived' ? 'bot' : session_type,
		updated_at             : Date.now(),
		new_user_message_count : 0,
	};
};

export default getPayloadToUpdateRoom;
