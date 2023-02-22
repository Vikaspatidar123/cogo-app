// eslint-disable-next-line import/no-unresolved
import countryCode from '@/data-store/constants/countries.json';

export const getIndiaCountryId = () => countryCode.find(({ country_code }) => country_code === 'IN')?.id;
