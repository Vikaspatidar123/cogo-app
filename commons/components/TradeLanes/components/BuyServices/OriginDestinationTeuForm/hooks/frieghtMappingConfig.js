const FRIEGHT_KEY_MAPPING = {
	air_freight: {
		lowerLimit: 'min_cargo_weight',
		upperLimit: 'max_cargo_weight',
		unit: 'cargo_weight_tenure_unit',
	},
	fcl_freight: {
		lowerLimit: 'min_containers',
		upperLimit: 'max_containers',
		unit: 'containers_count_tenure_unit',
	},
	lcl_freight: {
		lowerLimit: 'min_shipments',
		upperLimit: 'max_shipments',
		unit: 'shipments_count_tenure_unit',
	},
};

export default FRIEGHT_KEY_MAPPING;
