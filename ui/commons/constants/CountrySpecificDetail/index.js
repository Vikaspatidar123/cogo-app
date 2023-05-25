import { getByKey } from '@cogoport/utils';

import getCountryDetails from '../../utils/getCountryDetails';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const getDetails = ({
	country_id,
	accessor = '',
	accessorType = '',
	isDefaultData = true,
}) => {
	const countryDetails =		getCountryDetails({
		country_id,
	}) || {};

	const countryCode = countryDetails.country_code;

	let defaultCountryCode = countryCode;

	if (!(countryCode in GLOBAL_CONSTANTS.country_specific_data)) {
		defaultCountryCode = isDefaultData ? 'IN' : '';
	}

	const data = GLOBAL_CONSTANTS.country_specific_data[defaultCountryCode] || {};

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
