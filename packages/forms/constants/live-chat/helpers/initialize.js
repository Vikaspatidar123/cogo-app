const initializeLiveChat = (profile) => {
	const LCW = window.LiveChatWidget;

	LCW.on('ready', () => {
		LCW.call('set_session_variables', {
			username : profile?.name,
			scope    : 'app',
			user_id  : profile?.id,
			phone    : `${profile?.mobile_country_code} ${profile?.mobile_number}`,
			org      : profile?.organization?.business_name,
			org_id   : profile?.organization?.id,
		});
	});
};

export default initializeLiveChat;
