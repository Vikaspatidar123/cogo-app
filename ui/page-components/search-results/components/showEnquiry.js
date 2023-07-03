// const location_ids = [
// 	'1b94734e-7d51-4e94-9dd2-ef96aee64a8f',
// 	'fe92b7c7-9481-4a3b-8d79-df9a7bf94a4e',
// 	'72abc4ba-6368-4501-9a86-8065f5c191f8',
// ];

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import getCountryId from '@/ui/commons/utils/getCountryId';

const inco_terms = ['fca', 'fas', 'fob'];

// const export_inco_terms_except_ddp = ['cif', 'cfr', 'cpt', 'cip', 'dat', 'dap'];

const INDIA_COUNTRY_ID = getCountryId(GLOBAL_CONSTANTS.country_code.IN);

export const showEnquiryFunc = (rates_count = 0, data = {}) => {
	const notShowEnq =		inco_terms.includes(data?.inco_term)
		&& data?.destination_country_id === INDIA_COUNTRY_ID
		&& rates_count > 0
		&& data?.containers_count < 5;

	// if (!notShowEnq) {
	// 	notShowEnq =
	// 		data?.origin_country_id === INDIA_COUNTRY_ID &&
	// 		data?.destination_trade_id === '0cd3ac76-ee4e-4178-9511-8cf93caf045b' &&
	// 		export_inco_terms_except_ddp.includes(data?.inco_term) &&
	// 		rates_count > 0 &&
	// 		data?.containers_count < 5;
	// }

	return { notShowEnq };
};
