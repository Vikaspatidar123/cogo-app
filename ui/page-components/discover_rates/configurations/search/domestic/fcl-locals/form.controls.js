import CONTAINER_SIZES from '@/ui/commons/constants/CONTAINER_SIZES';

const formControlsAdvanced = (setOperatorName, is_org_pass_through) => [
	{
		label             : 'LOCALS LOCATION',
		name              : 'port_id',
		placeholder       : 'Search via port name/code',
		includedInOptions : false,
		type              : 'async_select',
		asyncKey          : 'locations',
		grouped           : ['city'],
		params            : { filters: { type: ['seaport', 'city'] } },
		rules             : { required: 'Port is required' },
		// style             : { width: '350px' },
	},
	{
		label             : 'LOCALS TYPE (HANDLING TYPE)',
		name              : 'trade_type',
		type              : 'select',
		placeholder       : 'Select Locals type',
		showArrow         : false,
		includedInOptions : false,
		options           : [
			{ label: 'Origin', value: 'export' },
			{ label: 'Destination', value: 'import' },
		],
		rules: { required: 'Locals Type is required' },
		// style : { width: '350px' },
	},
	...(is_org_pass_through
		? [
			{
				name    : 'is_pass_through_selected',
				type    : 'checkbox',
				options : [
					{
						label : 'Is pass through?',
						value : 'pass_through',
					},
				],
			},
		]
		: []),
	{
		name         : 'shipping_line_id',
		label        : 'Shipping Line',
		type         : 'select',
		placeholder  : 'Select Shipping Line',
		asyncKey     : 'shipping-lines',
		caret        : true,
		isClearable  : true,
		multiple     : false,
		handleChange : (obj) => {
			setOperatorName(obj);
		},
		labelKey : 'short_name',
		span     : 12,
		rules    : { required: 'Shipping Line is required' },
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
					commodity      : 'all_commodity',
				},
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
				label       : 'Cargo Weight per Container',
				subLabel    : '(in metric tonnes)',
				name        : 'cargo_weight_per_container',
				placeholder : 'between 0 to 30 metric tonnes',
				type        : 'number',
				span        : 12,
				rules       : { min: 0.1, max: 30, required: 'Cargo Weight is required' },
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
						label : 'Select Commodity',
						name  : 'commodity',
						type  : 'chips',
					},
				},
				rules: {
					required  : 'Container Type & Commodity is required',
					inputType : 'group',
				},
			},
		],
	},
];

export default formControlsAdvanced;
