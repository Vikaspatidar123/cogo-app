const showElements = (service, trade_type) => {
	const config = {
		fcl_freight: {
			bl_type: true,
			cargo_readiness_date: true,
			commodity_description: true,
			destination_cargo_handling_type: trade_type === 'import',
			free_days_detention_destination: true,
			msds_certificate: false,
			non_preferred_shipping_line_ids: true,
			origin_cargo_handling_type: trade_type === 'export',
			preferred_freight_rate: true,
			preferred_freight_rate_currency: true,
			preferred_shipping_line_ids: true,
			remarks: true,
		},
		trailer_freight: {
			cargo_stacking_type: false,
			commodity_description: false,
			expected_cargo_pick_up_date: false,
			packages: false,
			packing_list: false,
		},
		ftl_freight: {
			cargo_stacking_type: false,
			commodity_description: false,
			expected_cargo_pick_up_date: true,
			packages: true,
			packing_list: true,
		},
		fcl_customs: {
			commodity_description: true,
			dpd_license: false,
			factory_clearance_license: true,
			hs_code: true,
		},
		fcl_cfs: {
			cargo_weight_per_container: true,
			commodity_description: true,
			dpd_license: false,
			factory_clearance_license: true,
			hs_code: true,
			preferred_cfs: true,
		},
		ltl_freight: {},
		lcl_freight: {
			bl_type: true,
			cargo_stacking_type: true,
			commodity_description: true,
			destination_storage_free_days: true,
			packages: [],
			preferred_freight_rate: true,
			preferred_freight_rate_currency: true,
			remarks: true,
		},
		lcl_customs: {
			commodity_description: true,
		},
		air_customs: { commodity_description: true },
		air_freight: {
			cargo_clearance_date: true,
			cargo_stacking_type: true,
			commodity_description: true,
			destination_storage_free_days: true,
			operation_type: true,
			origin_storage_free_days: true,
			packages: true,
			preferred_airline_ids: true,
			preferred_freight_rate: true,
			preferred_freight_rate_currency: true,
			remarks: true,
		},
	};
	return config[service];
};

export default showElements;
