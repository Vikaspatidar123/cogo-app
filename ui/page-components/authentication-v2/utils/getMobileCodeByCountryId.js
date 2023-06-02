import countries from '@/.data-store/constants/countries.json';

export const getMobileCodeByCountryId = ({ country_id = '' }) => {
	const country = countries.find((c) => c.id === country_id);
	const { mobile_country_code = '' } = country || {};

	return mobile_country_code;
};
