import { isEmpty } from '@cogoport/utils';

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

	let locationData;

	if (isOrigin) {
		locationData = origin_port?.display_name
			|| origin_airport?.display_name
			|| origin_location?.display_name
			|| local?.display_name
			|| port?.display_name
			|| airport?.display_name
			|| pickup?.display_name;
	} else {
		locationData = destination_port?.display_name
			|| destination_airport?.display_name
			|| destination_location?.display_name
			|| local?.display_name
			|| drop?.display_name;
	}

	const arr = locationData?.split(',');
	const location = !isEmpty(arr) ? arr[0] : '';
	const country = !isEmpty(arr) ? arr.slice(1).join(',') : '';
	return { location, country };
};

export { getLocation };
