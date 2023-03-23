import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const lclControls = () => [
	{
		name    : 'destination_storage_free_days',
		label   : 'Free storage days at destination',
		options : [
			{ value: 7, label: '7 days' },
			{ value: 14, label: '14 days' },
			{ value: 21, label: '21 days' },
			{ value: 28, label: '28 days' },
		],
		type      : 'pills',
		condition : {},
		span      : 12,
	},
	{
		name    : 'preferred_freight_rate_currency',
		label   : 'Currency',
		type    : 'select',
		options : [
			GLOBAL_CONSTANTS.currency_code.USD,
			GLOBAL_CONSTANTS.currency_code.INR,
			GLOBAL_CONSTANTS.currency_code.EUR,
			GLOBAL_CONSTANTS.currency_code.GBP,
		].map((currencyCode) => ({
			label : currencyCode,
			value : currencyCode,
		})),
		span        : 5,
		condition   : {},
		placeholder : ' ',
		rules       : { required: 'Required' },
	},
	{
		name      : 'preferred_freight_rate',
		label     : 'Indicative Sell Rate per CBM',
		type      : 'number',
		span      : 7,
		condition : {},
		lowerlabel:
			'Please enter the indicative rates per CBM including your Sales margin',
		rules: { required: 'Required', min: 0 },
	},
	{
		name    : 'cargo_stacking_type',
		label   : 'Cargo stacking type',
		type    : 'pills',
		options : [
			{ label: 'Stackable', value: 'stackable' },
			{ label: 'Non stackable', value: 'non_stackable' },
		],
		rules: { required: 'Required' },
	},
	{
		name    : 'bl_type',
		label   : 'B/L Type',
		type    : 'pills',
		options : [
			{
				value : 'rfs',
				label : 'RFS (Original) - Received For Shipment',
			},
			{
				value : 'sob',
				label : 'SOB (Original) - Shipped on Board',
			},
			{
				value : 'seaway',
				label : 'Seaway (Original) Bill',
			},
		],
		condition : {},
		rules     : { required: 'Required' },
	},
	{
		name        : 'commodity_description',
		label       : 'Cargo Description',
		type        : 'textarea',
		rows        : 3,
		condition   : {},
		placeholder : 'Cargo Description, packaging details, etc.',
		rules       : { required: 'Required', minLength: 5 },
	},
	{
		name        : 'remarks',
		label       : 'Comments to Procurement',
		type        : 'textarea',
		rows        : 3,
		condition   : {},
		placeholder : 'Type...',
	},
	{
		name        : 'packages',
		type        : 'fieldArray',
		showButtons : true,
		label       : 'Choose Package Information',
		buttonText  : 'Add More Packages',
		value       : [
			{
				packing_type   : 'pallet',
				dimensions     : { length: 1, width: 1, height: 1 },
				packages_count : 1,
			},
		],
		controls: [
			{
				label   : 'Type',
				name    : 'packing_type',
				type    : 'pills',
				options : [
					{ label: 'Pallet', value: 'pallet' },
					{ label: 'Box', value: 'box' },
				],
				rules : { required: 'Required' },
				span  : 3,
			},
			{
				name          : 'dimensions',
				label         : 'Dimensions',
				type          : 'input-group',
				subLabel      : 'CM',
				span          : 6,
				inputControls : [
					{
						name        : 'length',
						type        : 'number',
						placeholder : 'L',
					},
					{
						name        : 'width',
						type        : 'number',
						placeholder : 'W',
					},
					{
						name        : 'height',
						type        : 'number',
						placeholder : 'H',
					},
				],
				rules: { required: 'Required', inputType: 'group' },
			},
			{
				label : 'Count',
				name  : 'packages_count',
				type  : 'number',
				style : { padding: '0px 2px' },
				span  : 2,
				rules : { min: 1, max: 10000, required: '*' },
			},
		],
	},
];
export default lclControls;
