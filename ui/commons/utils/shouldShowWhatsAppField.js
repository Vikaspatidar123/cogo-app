import { getCookie } from '@cogoport/utils';

import GLOBAL_CONSTANTS from '../constants/globals';

export const shouldShowWhatsAppField = () => {
	if (typeof window === 'undefined') return null;

	let show = false;
	const location = getCookie('location');
	if (GLOBAL_CONSTANTS.whatsapp_supported_country.includes(location)) {
		show = true;
	}
	return show;
};
