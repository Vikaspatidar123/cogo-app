import IN from '../constants/geo/IN';
import VN from '../constants/geo/VN';

import getCountryDetails from './getCountryDetails';

const COUNTRY_ID_MAPPING = {
	IN,
	VN,
};

const getEntityOptions = ({ country_id, country_code, isDefaultData = true }) => {
	const countryData = getCountryDetails({ country_id, country_code });
	const { country_code: countryCode } = countryData || {};

	const isCountryCodeValid = countryCode in COUNTRY_ID_MAPPING;

	if (isDefaultData) {
		return COUNTRY_ID_MAPPING[isCountryCodeValid ? countryCode : 'IN'];
	}
	return isCountryCodeValid ? COUNTRY_ID_MAPPING[countryCode] : {};
};

export default getEntityOptions;
