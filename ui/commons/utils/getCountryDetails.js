/* eslint-disable import/no-unresolved */
import COUNTRIES from '@/.data-store/constants/countries.json';

const countriesHash = COUNTRIES.reduce(
	(pv, acc) => ({ ...pv, [acc.id]: acc }),
	{},
);
export const countrieCodeHash = COUNTRIES.reduce(
	(pv, acc) => ({ ...pv, [acc.country_code]: acc }),
	{},
);

const getCountryDetails = ({ country_id, country_code }) => {
	const countryDetails = countriesHash[country_id] || countrieCodeHash[country_code] || {};

	if (country_id && country_code) {
		return countryDetails.country_code === country_code ? countryDetails : {};
	}
	return countryDetails;
};

export const getCountryCode = ({ country_id }) => {
	const countryDetails = getCountryDetails({ country_id });

	return countryDetails.country_code || null;
};
export default getCountryDetails;
