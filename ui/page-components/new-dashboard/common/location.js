import { isEmpty } from '@cogoport/utils';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const getLocation = (isOrigin, loc) => {
	const {
		origin_port = {},
		origin_airport = {}, origin_location = {},
		location: local = {}, port = {},
		airport = {}, pickup = {},
		destination_airport = {},
		destination_port = {},
		destination_location = {},
		drop = {},
	} = loc || {};

	let locationData = destination_port?.display_name || destination_airport?.display_name
		|| destination_location?.display_name
		|| local?.display_name
		|| drop?.display_name;

	if (isOrigin) {
		locationData = origin_port?.display_name
			|| origin_airport?.display_name
			|| origin_location?.display_name
			|| local?.display_name
			|| port?.display_name
			|| airport?.display_name
			|| pickup?.display_name;
	}

	const arr = locationData?.split(',');
	const location = !isEmpty(arr) ? arr[GLOBAL_CONSTANTS.zeroth_index] : '';
	const country = !isEmpty(arr) ? arr.slice(GLOBAL_CONSTANTS.one_index).join(',') : '';
	return { location, country };
};

export { getLocation };
