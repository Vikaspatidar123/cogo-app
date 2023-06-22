/* eslint-disable import/no-unresolved */
import COUNTRIES from '@/.data-store/constants/countries.json';

const countriesHash = COUNTRIES.reduce(
	(pv, acc) => ({ ...pv, [acc.id]: acc }),
	{},
);

const getCountryDetails = ({ country_id }) => countriesHash[country_id] || {};

export const getCountryCode = ({ country_id }) => {
	const countryDetails = getCountryDetails({ country_id });

	return countryDetails.country_code || null;
};
export default getCountryDetails;
