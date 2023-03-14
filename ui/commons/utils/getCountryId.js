// eslint-disable-next-line import/no-unresolved
import countryCodes from '@/data-store/constants/countries.json';

export const getCountryId = (countryCode = '') => countryCodes
	.find(({ country_code }) => country_code === countryCode)?.id;
