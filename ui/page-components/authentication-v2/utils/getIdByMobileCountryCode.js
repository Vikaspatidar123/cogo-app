import countries from '@/.data-store/constants/countries.json';

export const getIdByMobileCountryCode = ({ mobile_country_code = '' }) => {
	const country = countries.find((c) => c.mobile_country_code === mobile_country_code);
	const { id = '' } = country || {};

	return id;
};
