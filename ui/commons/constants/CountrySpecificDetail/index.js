import { getByKey } from '@cogoport/utils';

import getCountryDetails from '../../utils/getCountryDetails';
import defaultInfo from '../geo/default';
import IN from '../geo/IN';
import VN from '../geo/VN';

const COUNTRY_SPECIFIC_DATA = {
	IN : IN.others,
	VN : VN.others,
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

	let data = COUNTRY_SPECIFIC_DATA[countryCode] || {};

	if (!(countryCode in COUNTRY_SPECIFIC_DATA)) {
		data = isDefaultData ? defaultInfo : {};
	}

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

export { getCountrySpecificData, CountrySpecificData };
