const getLocation = (isOrigin, loc) => {
	let locationData;
	if (isOrigin) {
		locationData =			loc?.origin_port?.display_name
			|| loc?.origin_airport?.display_name
			|| loc?.origin_location?.display_name
			|| loc?.location?.display_name
			|| loc?.port?.display_name
			|| loc?.airport?.display_name
			|| loc?.pickup?.display_name;
	} else {
		locationData =			loc?.destination_port?.display_name
			|| loc?.destination_airport?.display_name
			|| loc?.destination_location?.display_name
			|| loc?.location?.display_name
			|| loc?.drop?.display_name;
	}

	const arr = locationData?.split(',');
	const location = arr?.length > 0 ? arr[0] : '';
	const country = arr?.length > 0 ? arr.slice(1).join(',') : '';
	return { location, country };
};

export { getLocation };
