import CONTAINER_SIZES from '@cogo/commons/constants/CONTAINER_SIZES';

const formControlsAdvanced = [
	{
		name        : 'cargo_handling_type',
		label       : 'Type of Stuffing',
		type        : 'pills',
		placeholder : 'Select type of stuffing',
		options     : [
			{
				label      : 'Direct Port Delivery',
				value      : 'direct_port_delivery',
				trade_type : 'import',
			},
			{
				label      : 'Destuffing at Factory',
				value      : 'delivery_from_dock',
				trade_type : 'import',
			},
			{
				label      : 'Destuffing at CFS',
				value      : 'destuffing_at_dock',
				trade_type : 'import',
			},
			{
				label      : 'Dock Stuffing',
				value      : 'stuffing_at_dock',
				trade_type : 'export',
			},
			{
				label      : 'Factory Stuffing',
				value      : 'stuffing_at_factory',
				trade_type : 'export',
			},
		],
		rules: { required: 'Type of stuffing at destinationn is required' },
	},
	{
		name        : 'containers',
		type        : 'fieldArray',
		showButtons : true,
		buttonText  : 'Add Containers',
		value       : [{
			containers_count         : 1,
			container_size           : '20',
			container_type_commodity : { container_type: 'standard', commodity: null },
		}],
		controls: [
			{
				label : 'Containers Count',
				name  : 'containers_count',
				type  : 'number',
				span  : 12,
				value : 1,
				rules : { required: 'Container Quantity is required', min: 1, max: 10000 },
			},
			{
				label   : 'Container Size',
				name    : 'container_size',
				type    : 'pills',
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
						type           : 'pills',
						optionsListKey : 'container-types',
					},
					commodity: {
						label          : 'Select Commodity',
						name           : 'commodity',
						type           : 'pills',
						commodity_type : 'fcl_customs',
					},
				},
				rules: { required: 'Commodity is required', inputType: 'group' },
			},
		],

	},
];

export default formControlsAdvanced;
