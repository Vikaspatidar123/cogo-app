import CONTAINER_SIZES from '@cogo/commons/constants/CONTAINER_SIZES';

const controls = [
	{
		label             : 'Origin Location',
		name              : 'origin_location_id',
		placeholder       : 'Search via port',
		includedInOptions : false,
		type              : 'async_select',
		asyncKey          : 'locations',
		grouped           : ['city', 'country'],
		params            : { filters: { type: ['seaport', 'country', 'city'] } },
		rules             : { required: 'Origin Port is required' },
	},
	{
		label             : 'Destination Location',
		name              : 'destination_location_id',
		placeholder       : 'Search via port',
		includedInOptions : false,
		type              : 'async_select',
		asyncKey          : 'locations',
		grouped           : ['city', 'country'],
		params            : { filters: { type: ['seaport', 'country', 'city'] } },
		rules             : { required: 'Destination Port is required' },
	},
	{
		name        : 'containers',
		type        : 'fieldArray',
		showButtons : true,
		buttonText  : 'Add Containers',
		value       : [
			{
				containers_count         : 1,
				container_size           : '20',
				container_type_commodity : {
					container_type : 'standard',
					commodity      : null,
				},
				cargo_weight_per_container: 18,
			},
		],
		controls: [
			{
				label : 'Containers Count',
				name  : 'containers_count',
				type  : 'number',
				span  : 12,
				value : 1,
				rules : {
					required : 'Container Quantity is required',
					min      : 1,
					max      : 10000,
				},
			},
			{
				label   : 'Container Size',
				name    : 'container_size',
				type    : 'chips',
				span    : 12,
				options : CONTAINER_SIZES,
			},
			{
				label         : 'Container Type',
				name          : 'container_type_commodity',
				type          : 'container_type-commodity',
				span          : 12,
				controlFields : {
					container_type: {
						label          : 'Container Type',
						name           : 'container_type',
						type           : 'chips',
						optionsListKey : 'container-types',
					},
					commodity: {
						label          : 'Select Commodity',
						name           : 'commodity',
						type           : 'chips',
						commodity_type : 'local',
					},
				},
			},
			{
				label       : 'Cargo Weight per Container',
				subLabel    : '(in metric tonnes)',
				name        : 'cargo_weight_per_container',
				placeholder : 'between 0 to 30 metric tonnes',
				type        : 'number',
				span        : 12,
				value       : 18,
				rules       : { required: 'Weight is required', min: 0.1, max: 30 },
			},
		],
	},
];

export default controls;
