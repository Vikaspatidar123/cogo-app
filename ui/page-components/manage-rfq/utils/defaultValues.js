import addDays from './addDays';

const lclDefaultValue = {
	defaultValues: {
		search_rates: [
			{
				origin_port_id      : '',
				destination_port_id : '',
				commodity           : 'general',
				inco_term           : 'cif',
				calculate_by        : 'total',
				remarks             : [
					{
						preferred_shipping_lines : [],
						excluded_shipping_lines  : [],
						price                    : { currency: 'INR', price: '' },
					},
				],
				containers : [{ packages_count: '1', weight: '1', volume: '1' }],
				dimensions : [
					{
						packages_count : '1',
						weight         : '1',
						length         : '100',
						width          : '100',
						height         : '100',
					},
				],
			}],
	},

};

const fclDefaultValue = {
	defaultValues: {
		search_rates: [
			{
				origin_port_id      : '',
				destination_port_id : '',
				inco_term           : 'cif',
				containers          : [
					{
						container_type             : 'standard',
						container_size             : '20',
						containers_count           : '1',
						commodity                  : 'general',
						cargo_weight_per_container : '18',
					},
				],
				remarks: [
					{
						preferred_shipping_lines : [],
						excluded_shipping_lines  : [],
						price                    : { currency: 'INR', price: '' },
					},
				],
			},
		],
	},
};

const airDefaultValues = {
	defaultValues: {
		search_rates: [
			{
				origin_airport_id      : '',
				destination_airport_id : '',
				commodity_type         : 'general',
				commodity_subtype      : 'all',
				cargo_ready_date       : addDays(new Date(), 1),
				payment_type           : 'prepaid',
				inco_term              : 'cif',
				calculate_by           : 'total',
				remarks                : [
					{
						preferred_air_lines : [],
						excluded_air_lines  : [],
						price               : { currency: 'INR', price: '' },
					},
				],
				containers: [
					{
						packing_type   : 'pallet',
						packages_count : '1',
						volume         : '1',
						package_weight : '1',
						handling_type  : 'stackable',
					},
				],
				dimensions: [
					{
						packing_type   : 'pallet',
						packages_count : '1',
						length         : '100',
						height         : '100',
						width          : '100',
						package_weight : '1',
						handling_type  : 'stackable',
					},
				],
			},
		],
	},
};

export { lclDefaultValue, fclDefaultValue, airDefaultValues };
