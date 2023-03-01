/* eslint-disable import/no-unresolved */
import COUNTRIES from '@/.data-store/constants/countries.json';

const countriesHash = {};

(COUNTRIES || []).forEach((item) => {
	countriesHash[item.id] = item;
	countriesHash[item.country_code] = item;
});

export default countriesHash;