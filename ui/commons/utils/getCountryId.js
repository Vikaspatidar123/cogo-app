// eslint-disable-next-line import/no-unresolved
import COUNTRIES from '@/.data-store/constants/countries.json';

export const getCountryId = (countryCode = '') => COUNTRIES.find(({ country_code }) => country_code === countryCode)?.id;
