/* eslint-disable import/no-unresolved */
import COUNTRIES from '@/.data-store/constants/countries.json';

export const getCountryDetailsByCountryCode = ({ country_code = '' }) => {
	const country = COUNTRIES.find((c) => c.country_code === country_code);

	return country || {};
};
