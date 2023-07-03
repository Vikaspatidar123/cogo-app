import IN from '../constants/geo/IN';
import VN from '../constants/geo/VN';

import getCountryId from './getCountryId';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const INDIA_COUNTRY_ID = getCountryId(GLOBAL_CONSTANTS.country_code.IN);
const VIETNAM_COUNTRY_ID = getCountryId(GLOBAL_CONSTANTS.country_code.VN);

const MAPPING = {
	[INDIA_COUNTRY_ID]   : IN,
	[VIETNAM_COUNTRY_ID] : VN,
};

const getEntityOptions = ({ country_id }) => MAPPING[country_id in MAPPING ? country_id : INDIA_COUNTRY_ID];

export default getEntityOptions;
