const formatLocations = ({
	originDetails = {},
	destinationDetails = {},
	originPortId,
	destinationPortId,
	serviceType,
}) => {
	let origin = {};
	let destination = {};

	(Object.keys(originDetails?.[serviceType]) || []).forEach((item) => {
		if (originDetails?.[serviceType][item].id === originPortId) {
			origin = { ...originDetails?.[serviceType][item] };
		}
	});

	(Object.keys(destinationDetails?.[serviceType]) || []).forEach((item) => {
		if (destinationDetails?.[serviceType][item].id === destinationPortId) {
			destination = { ...destinationDetails?.[serviceType][item] };
		}
	});

	return {
		origin_location_id       : origin?.id,
		origin_country_id        : origin?.country_id,
		origin_continent_id      : origin?.continent_id,
		destination_location_id  : destination?.id,
		destination_country_id   : destination?.country_id,
		destination_continent_id : destination?.continent_id,
	};
};

export default formatLocations;
