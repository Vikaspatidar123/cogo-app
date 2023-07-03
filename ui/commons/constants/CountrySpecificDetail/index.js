import { getByKey } from '@cogoport/utils';

import getCountryDetails from '../../utils/getCountryDetails';
import defaultInfo from '../geo/default';
import IN from '../geo/IN';
import VN from '../geo/VN';

const COUNTRY_SPECIFIC_DATA = {
	IN : IN.others,
	VN : VN.others,
};

let data = {};

const getDetails = ({
	country_id,
	accessor = '',
	accessorType = '',
	isDefaultData = true,
}) => {
	const countryDetails = getCountryDetails({
		country_id,
	}) || {};

	const countryCode = countryDetails.country_code;

	if (!(countryCode in COUNTRY_SPECIFIC_DATA)) {
		data = isDefaultData ? defaultInfo : {};
	}

	data = COUNTRY_SPECIFIC_DATA[countryCode] || {};

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
			{getDetails({
				country_id,
				accessor,
				accessorType,
				isDefaultData,
			})}
		</>
	);
}

const getCountrySpecificData = ({
	country_id,
	accessor = '',
	accessorType = '',
	isDefaultData,
}) => getDetails({
	country_id,
	accessor,
	accessorType,
	isDefaultData,
});

export { getCountrySpecificData, CountrySpecificData };
