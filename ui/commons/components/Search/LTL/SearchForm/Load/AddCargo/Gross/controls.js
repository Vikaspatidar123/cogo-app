export const controls = [
	{
		name    : 'packing_type',
		type    : 'select',
		label   : 'Package Type',
		style   : { width: '120px' },
		rules   : { required: 'Package Type is required' },
		options : [
			{
				label : 'Pallet',
				value : 'pallet',
			},
			{
				label : 'Box',
				value : 'box',
			},
			{
				label : 'Crate',
				value : 'crate',
			},
			{
				label : 'Loose',
				value : 'loose',
			},
		],
	},

	{
		name  : 'packages_count',
		label : 'Total Quantity',
		type  : 'number',
		style : { width: '120px' },
		rules : { required: true },
	},

	{
		name   : 'package_weight',
		label  : 'Total Weight',
		type   : 'number',
		style  : { width: '120px' },
		suffix : 'kgs',
		rules  : { required: true },
	},
	{
		name   : 'volume',
		label  : 'Gross Volume',
		type   : 'number',
		style  : { width: '190px' },
		suffix : 'cc',
		rules  : { required: true },
	},
	{
		name    : 'handling_type',
		label   : 'Handling',
		type    : 'select',
		style   : { width: '190px' },
		rules   : { required: 'Handling Type is required' },
		options : [
			{
				label : 'Stackable',
				value : 'stackable',
			},
			{
				label : 'Non-Stackable',
				value : 'non_stackable',
			},
		],
	},
	{
		name          : 'dimensions',
		label         : 'Max Dimensions (in cm)',
		type          : 'input-group',
		className     : 'small-input medium-input',
		subLabel      : 'CM',
		style         : { width: '190px' },
		showMessage   : true,
		inputControls : [
			{
				name        : 'length',
				type        : 'number',
				placeholder : 'L',
				showMessage : true,
			},
			{
				name        : 'width',
				type        : 'number',
				span        : 4,
				placeholder : 'W',
				showMessage : true,
			},
			{
				name        : 'height',
				type        : 'number',
				placeholder : 'H',
				showMessage : true,
			},
			// {
			// 	name: 'unit',
			// 	label: 'Unit',
			// 	className: 'primary md',
			// 	placeholder: 'Unit',
			// 	type: 'select',
			// 	caret: false,
			// 	rules: { required: 'Dimension is required' },
			// 	options: [
			// 		{
			// 			label: 'cm',
			// 			value: 'cm',
			// 		},
			// 		{
			// 			label: 'm',
			// 			value: 'm',
			// 		},
			// 	],
			// },
		],
		rules: {
			required : true,
			validate : (value) => (value?.length && value?.width && value?.height
				? undefined
				: 'Dimension is Required'),
		},
	},
];
