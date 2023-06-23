/* eslint-disable import/no-unresolved */
import COUNTRIES from '@/.data-store/constants/countries.json';

export const getIdByMobileCountryCode = ({ mobile_country_code = '' }) => {
	const country = COUNTRIES.find((c) => c.mobile_country_code === mobile_country_code);

	const { id = '' } = country || {};

	return id;
};
