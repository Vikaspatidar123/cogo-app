/* eslint-disable import/no-unresolved */
import COUNTRIES from '@/.data-store/constants/countries.json';

export const countriesHash = COUNTRIES.reduce(
	(pv, acc) => ({ ...pv, [acc.id]: acc }),
	{},
);
export const countrieCodeHash = COUNTRIES.reduce(
	(pv, acc) => ({ ...pv, [acc.country_code]: acc }),
	{},
);
