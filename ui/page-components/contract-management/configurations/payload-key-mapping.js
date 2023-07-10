export const KEYS_MAPPING = {
	fcl_freight: {
		name: {
			origin      : 'origin_port',
			destination : 'destination_port',
		},
		id: {
			origin      : 'origin_port_id',
			destination : 'destination_port_id',
		},
	},
	lcl_freight: {
		name: {
			origin      : 'origin_port',
			destination : 'destination_port',
		},
		id: {
			origin      : 'origin_port_id',
			destination : 'destination_port_id',
		},
	},
	air_freight: {
		name: {
			origin      : 'origin_airport',
			destination : 'destination_airport',
		},
		id: {
			origin      : 'origin_airport_id',
			destination : 'destination_airport_id',
		},
	},
	ltl_freight: {
		name: {
			origin      : 'origin_location',
			destination : 'destination_location',
		},
		id: {
			origin      : 'origin_location_id',
			destination : 'destination_location_id',
		},
	},
	ftl_freight: {
		name: {
			origin      : 'origin_location',
			destination : 'destination_location',
		},
		id: {
			origin      : 'origin_location_id',
			destination : 'destination_location_id',
		},
	},
};
