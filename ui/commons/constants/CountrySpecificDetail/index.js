import { getByKey, getCookie } from '@cogoport/utils';

import getCountryDetails from '../../utils/getCountryDetails';
import getGeoConstants from '../geo';
import defaultInfo from '../geo/default';
import IN from '../geo/IN';
import VN from '../geo/VN';
import getLanguageCode from '../getLanguageCode';

const COUNTRY_SPECIFIC_DATA = {
	IN      : IN.others,
	VN      : VN.others,
	default : defaultInfo,
};

const getCountrySpecificData = ({
	country_id,
	accessor = '',
	accessorType = '',
	isDefaultData = true,
	country_code = '',
}) => {
	const countryDetails = getCountryDetails({
		country_id, country_code,
	}) || {};

	const countryCode = countryDetails.country_code;

	const data = COUNTRY_SPECIFIC_DATA?.[countryCode] || (isDefaultData ? COUNTRY_SPECIFIC_DATA.default : {});

	return getByKey(data[accessorType], accessor) || null;
};

function CountrySpecificData({
	country_id,
	accessor = '',
	accessorType = '',
	isDefaultData,
}) {
	return (
		<>
			{getCountrySpecificData({
				country_id,
				accessor,
				accessorType,
				isDefaultData,
			})}
		</>
	);
}

const getLocaleSpecificLabels = ({ accessor = '', accessorType = '' }) => {
	if (typeof window === 'undefined') {
		return null;
	}

	const entityLocale = getCookie('locale');

	const geo = getGeoConstants();

	const langCode = getLanguageCode(entityLocale);

	const data = geo.others;

	return getByKey(data[accessorType][accessor], [langCode]) || null;
};

export { getCountrySpecificData, CountrySpecificData, getLocaleSpecificLabels };
