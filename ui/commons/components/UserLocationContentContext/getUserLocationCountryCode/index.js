import city_country_mapping from './city-country-mapping.json';
import country_countryCode_mapping from './country-countryCode-mapping.json';

const getUserLocationCountryCode = () => {
	let countryCode = country_countryCode_mapping.India;

	if (!Intl) {
		return countryCode;
	}

	const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

	const userTimeZoneArr = userTimeZone.split('/');

	// const userRegion = userTimeZoneArr[0];
	const userCity = userTimeZoneArr[userTimeZoneArr.length - 1];
	const userCountry = city_country_mapping[userCity];

	if (userCountry in country_countryCode_mapping) {
		countryCode = country_countryCode_mapping[userCountry];
	}

	return countryCode;
};

export default getUserLocationCountryCode;
