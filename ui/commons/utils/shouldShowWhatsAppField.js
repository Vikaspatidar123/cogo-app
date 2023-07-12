import { getCookie } from '@cogoport/utils';

import GLOBAL_CONSTANTS from '../constants/globals';

const WHATSAPP_SUPPORTED_COUNTRIES = GLOBAL_CONSTANTS.service_supported_countries
	.feature_supported_service.whatsapp.supported_countries;

export const shouldShowWhatsAppField = () => {
	if (typeof window === 'undefined') return null;

	const location = getCookie('location');
	return WHATSAPP_SUPPORTED_COUNTRIES.includes(location);
};
