import getGeoConstants from '@cogo/globalization/constants/geo';
import insertLiveChat from '@cogo/product/live-chat/helpers/create-live-chat';
import initializeLiveChat from '@cogo/product/live-chat/helpers/initialize';
import getSearchDetails from './get-search-params';

const geo = getGeoConstants();

const openChatWidget = (TIMEOUT, user_profile, details) => {
	try {
		const LCW = window.LiveChatWidget;
		setTimeout(() => {
			LCW.call('set_customer_name', user_profile?.name);
			LCW.call('set_customer_email', user_profile?.email);
			LCW.call('update_session_variables', {
				rate_count: details.rates_count,
				search_id: details?.id,
				search_requirements: getSearchDetails(details),
			});
			LCW.call('maximize');
		}, TIMEOUT);
	} catch (err) {
		console.log(err);
	}
};

const handleLiveChat = (user_profile, details, scope) => {
	const entity_types = user_profile?.partner?.entity_types;
	const account_type = user_profile?.organization?.account_type;
	const isChannelPartner =
		entity_types?.includes('channel_partner') &&
		!entity_types?.includes('cogoport');
	const showChat =
		(scope === 'partner' && isChannelPartner) ||
		(scope === 'app' && account_type === 'importer_exporter');
	if (showChat) {
		insertLiveChat();
		initializeLiveChat(user_profile, scope);
		if (details?.rates_count === 0) {
			openChatWidget(0, user_profile, details);
		} else {
			openChatWidget(geo.lcw_timer, user_profile, details);
		}
	}
};

export default handleLiveChat;
