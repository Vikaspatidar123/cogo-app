import { getCookie } from '@cogoport/utils';

import CN from './CN';
import ID from './ID';
import IN from './IN';
import SG from './SG';
import TH from './TH';
import VN from './VN';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const { country_entity_ids } = GLOBAL_CONSTANTS;

const MAPPING = {
	[country_entity_ids.IN] : IN,
	[country_entity_ids.VN] : VN,
	[country_entity_ids.SG] : SG,
	[country_entity_ids.TH] : TH,
	[country_entity_ids.ID] : ID,
	[country_entity_ids.CN] : CN,
};

const getGeoConstants = () => {
	let parentEntity = '';

	if (typeof window !== 'undefined') {
		parentEntity = getCookie('parent_entity_id');
	}

	return MAPPING[parentEntity in MAPPING ? parentEntity : country_entity_ids.IN];
};
export default getGeoConstants;
