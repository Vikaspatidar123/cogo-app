const controls = [
	{
		label       : 'Total Weight (kgs)',
		name        : 'weight',
		placeholder : 'Enter total weight (min: 0.1, max: 10000)',
		type        : 'number',
		value       : 1,
		rules       : { required: 'Weight is required', min: 1, max: 10000 },
	},
	{
		name        : 'packages',
		type        : 'fieldArray',
		showButtons : true,
		label       : 'Choose Package Information',
		buttonText  : 'Add More Packages',
		value       : [{
			packing_type   : 'pallet',
			dimensions     : { length: 1, width: 1, height: 1 },
			packages_count : 1,
		}],
		controls: [
			{
				label       : 'Type',
				name        : 'packing_type',
				placeholder : 'Select',
				type        : 'select',
				options     : [
					{ label: 'Pallet', value: 'pallet' },
					{ label: 'Box', value: 'box' },
				],
				rules : { required: '*' },
				span  : 3,
			},
			{
				name          : 'dimensions',
				label         : 'Dimensions',
				type          : 'input-group',
				className     : 'small-input medium-input',
				subLabel      : 'CM',
				span          : 6,
				style         : { marginLeft: '1px', marginRight: '1px' },
				inputControls : [
					{
						name        : 'length',
						type        : 'number',
						placeholder : 'L',
						style       : { marginRight: '1px' },
					},
					{
						name        : 'width',
						type        : 'number',
						span        : 4,
						placeholder : 'W',
						style       : { marginRight: '1px' },
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
				label       : 'Count',
				name        : 'packages_count',
				placeholder : '(min 1, max 10000)',
				type        : 'number',
				style       : { padding: '0px 2px' },
				span        : 2,
				rules       : { required: '*', min: 1, max: 10000 },
			},
		],
	},
];
export default controls;
