import { getCookie } from '@cogoport/utils';

import IN from './IN';
import VN from './VN';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const { country_entity_ids } = GLOBAL_CONSTANTS;

const MAPPING = {
	[country_entity_ids.IN] : IN,
	[country_entity_ids.VN] : VN,
};

const getGeoConstants = () => {
	let parentEntity = '';

	if (typeof window !== 'undefined') {
		parentEntity = getCookie('parent_entity_id');
	}

	return MAPPING[parentEntity in MAPPING ? parentEntity : country_entity_ids.IN];
};
export default getGeoConstants;
