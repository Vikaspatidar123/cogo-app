import isSingleLocation from './isSingleLocation';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const servicableCountryList = GLOBAL_CONSTANTS.servicable_country_list;

const isServicableCountry = (headerData) => {
	const { search_type } = headerData;
	const suffixConfig = {
		lcl_freight                 : 'port',
		fcl_freight                 : 'port',
		air_freight                 : 'airport',
		trailer_freight             : 'location',
		ftl_freight                 : 'location',
		ltl_freight                 : 'location',
		fcl_customs                 : 'port',
		lcl_customs                 : 'location',
		air_customs                 : 'airport',
		haulage_freight             : 'location',
		origin_trailer_freight      : 'location',
		destination_trailer_freight : 'location',
		origin_ftl_freight          : 'location',
		destination_ftl_freight     : 'location',
		origin_ltl_freight          : 'location',
		destination_ltl_freight     : 'location',
		origin_fcl_customs          : 'port',
		destination_fcl_customs     : 'port',
		origin_lcl_customs          : 'location',
		destination_lcl_customs     : 'location',
		origin_air_customs          : 'airport',
		destination_air_customs     : 'airport',
		fcl_cfs                     : 'port',
	};
	const suffix = suffixConfig[search_type];

	const origin = !isSingleLocation(search_type) ? `origin_${suffix}` : suffix;
	const destination = !isSingleLocation(search_type)
		? `destination_${suffix}`
		: suffix;

	return (
		servicableCountryList.includes(
			((headerData[origin] || {}).country || {}).country_code,
		)
		|| servicableCountryList.includes(
			((headerData[destination] || {}).country || {}).country_code,
		)
	);
};

export default isServicableCountry;
