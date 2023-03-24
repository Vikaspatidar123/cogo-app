// import getGeoConstants from '@cogo/globalization/constants/geo';

// const geo = getGeoConstants();

const fclControls = [
	{
		label     : 'Container',
		type      : 'fieldArray',
		name      : 'search_rates',
		addButton : 'Containers',
		controls  : [
			{
				inlineLabel       : 'Origin',
				name              : 'origin_port_id',
				apiKey            : 'origin_port_id',
				placeholder       : 'Type to search...',
				includedInOptions : false,
				defaultOptions    : true,
				params            : {
					filters: { type: ['seaport', 'city'] },
					// includes : { continent_id: true },
				},
				grouped      : ['city', 'country'],
				type         : 'async_select',
				asyncKey     : 'locations',
				showOptional : false,
				rules        : { required: 'Origin Port is required' },
				span         : 3.9,
			},
			{
				inlineLabel       : 'Destination',
				name              : 'destination_port_id',
				apiKey            : 'destination_port_id',
				placeholder       : 'Type to search...',
				defaultOptions    : true,
				includedInOptions : false,
				params            : {
					filters: { type: ['seaport', 'city'] },
					// includes : { continent_id: true },
				},
				grouped      : ['city', 'country'],
				type         : 'async_select',
				asyncKey     : 'locations',
				showOptional : false,
				rules        : { required: 'Destination Port is required' },
				span         : 3.7,
			},
			{
				name        : 'inco_term',
				inlineLabel : 'Inco-Term',
				type        : 'select',
				placeholder : 'Incoterm',
				rules       : { required: 'Incoterm is required' },
				span        : 1.7,
			},
			{
				name        : 'additional_services',
				inlineLabel : 'Additional Services',
				span        : 2.7,
			},
			{
				label     : 'Container',
				type      : 'fieldArray',
				name      : 'containers',
				addButton : 'Container',
				controls  : [
					{
						inlineLabel : 'Container Size',
						name        : 'container_size',
						type        : 'select',
						placeholder : 'Container Size',
						optionKey   : 'container-sizes',
						rules       : { required: 'Container is required' },
						span        : 2.4,
					},
					{
						inlineLabel    : 'Container Type',
						name           : 'container_type',
						type           : 'select',
						placeholder    : 'Container Type',
						optionKey      : 'container-types',
						defaultOptions : true,
						rules          : { required: 'Container is required' },
						span           : 2.4,
					},
					{
						name          : 'commodity',
						inlineLabel   : 'Commodity',
						type          : 'select',
						placeholder   : 'Commodity',
						commodityType : 'freight',
						optionKey     : 'commodities',
						rules         : { required: 'Commodity is required' },
						span          : 2.4,
					},
					{
						inlineLabel : 'Containers Count',
						name        : 'containers_count',
						subLabel    : 'containers',
						type        : 'number',
						placeholder : 'Containers Count',
						rules       : {
							min      : 1,
							max      : 10000,
							required : 'Container count is required',
						},
						span: 2.4,
					},
					{
						inlineLabel : 'Weight',
						subLabel    : 'in metric tonnes',
						name        : 'cargo_weight_per_container',
						placeholder : 'Cargo weight per container',
						type        : 'number',
						rules       : { min: 0.1, max: 30, required: 'Weight is required' },
						span        : 2.4,
					},
				],
			},
			{
				label    : 'Additional Remarks',
				type     : 'fieldArray',
				name     : 'remarks',
				controls : [
					{
						inlineLabel : 'Minimum Origin Demurrage',
						subLabel    : 'days',
						name        : 'min_origin_demurrage',
						placeholder : '0',
						type        : 'number',
						rules       : { min: 1 },
						span        : 3,
					},
					{
						inlineLabel : 'Minimum Origin Detention',
						subLabel    : 'days',
						name        : 'min_origin_detention',
						placeholder : '0',
						type        : 'number',
						rules       : { min: 1 },
						span        : 3,
					},
					{
						inlineLabel : 'Minimum Destination Demurrage',
						subLabel    : 'days',
						name        : 'min_destination_demurrage',
						placeholder : '0',
						type        : 'number',
						rules       : { min: 1 },
						span        : 3,
					},
					{
						inlineLabel : 'Minimum Destination Detention',
						subLabel    : 'days',
						name        : 'min_destination_detention',
						placeholder : '0',
						type        : 'number',
						rules       : { min: 1 },
						span        : 3,
					},
					{
						name           : 'preferred_shipping_lines',
						inlineLabel    : 'Preferred Shipping Lines',
						type           : 'async_select',
						defaultOptions : false,
						multiple       : true,
						className      : 'remarks_shipping_lines',
						placeholder    : 'Type to search',
						asyncKey       : 'shipping_lines',
						span           : 3,
					},
					{
						name           : 'excluded_shipping_lines',
						inlineLabel    : 'Excluded Shipping Lines',
						type           : 'async_select',
						defaultOptions : false,
						multiple       : true,
						className      : 'remarks_shipping_lines',
						placeholder    : 'Type to search',
						asyncKey       : 'shipping_lines',
						span           : 3,
					},
					{
						name        : 'price',
						inlineLabel : 'Indicative Price',
						placeholder : 'Price',
						type        : 'price_select',
						span        : 3,
						rules       : {
							validate: (value) => ((value.price === 0 ? 0 : value.price || 1) <= 0
								? 'Price should be greater than 0.'
								: undefined),
						},
					},
				],
			},
		],
	},
];

export default fclControls;
