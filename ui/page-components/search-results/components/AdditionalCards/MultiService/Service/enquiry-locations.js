const enquiryLocations = {
	fcl_freight: {
		origin               : 'origin_main_port',
		alternateOrigin      : 'origin_port',
		destination          : 'destination_port',
		alternateDestination : 'destination_main_port',
	},
	lcl_freight: {
		service_types : 'freight',
		origin        : 'origin_port',
		destination   : 'destination_port',
	},
	air_freight: {
		service_types : 'freight',
		origin        : 'origin_airport',
		destination   : 'destination_airport',
	},
	ltl_freight: {
		service_types : 'ltl',
		origin        : 'origin_location',
		destination   : 'destination_location',
	},
	ftl_freight: {
		service_types : 'ftl',
		origin        : 'origin_location',
		destination   : 'destination_location',
	},

	trailer_freight: {
		service_types : 'trailer',
		origin        : 'origin_location',
		destination   : 'destination_location',
	},

	haulage_freight: {
		service_types : 'haulage',
		origin        : 'origin_location',
		destination   : 'destination_location',
	},

	fcl_customs: {
		service_types : 'customs',
		origin        : 'port',
	},

	lcl_customs: {
		service_types : 'customs',
		origin        : 'location',
	},
	air_customs: {
		service_types : 'customs',
		origin        : 'airport',
	},
};
export default enquiryLocations;
