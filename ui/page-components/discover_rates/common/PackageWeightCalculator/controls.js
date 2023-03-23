const controls = [
	{
		name: 'selected_unit',
		type: 'select',
		label: '',
		value: '100',
		span: 12,
		showClearSelection: false,
		showMessage: false,
		disabled: true,
		options: [
			{ label: 'Meter', value: '1' },
			{ label: 'Inch', value: '39.37' },
			{ label: 'Centimeter (CM)', value: '100' },
			{ label: 'Feet', value: '3.281' },
			{ label: 'Millimetre (mm)', value: '1000' },
		],
	},
	{
		name: 'packages',
		type: 'fieldArray',
		showButtons: false,
		showDeleteButton: true,
		value: [
			{
				no_of_pieces: 1,
				dimensions: { length: 1, width: 1, height: 1 },
				weight: 1,
			},
		],
		controls: [
			{
				label: 'No. of packages',
				name: 'no_of_pieces',
				type: 'number',
				showLabel: false,
				isShowStepper: false,
				style: { padding: '0px 4px' },
				max: 1000,
				min: 1,
				span: 2,
				showMessage: false,
				showMargin: false,
				validations: [
					{
						type: 'min',
						message: 'Count cannot be less than 1',
						min: 1,
					},
				],
			},
			{
				name: 'dimensions',
				label: 'Dimensions',
				type: 'input-group',
				className: 'small-input',
				subLabel: 'CM',
				span: 6,
				showMessage: false,
				showLabel: false,
				showMargin: false,
				inputControls: [
					{
						name: 'length',
						type: 'number',
						placeholder: 'L',
						style: { padding: '0px 8px' },
					},
					{
						name: 'width',
						type: 'number',
						span: 4,
						placeholder: 'W',
						style: { padding: '0px 8px' },
					},
					{
						name: 'height',
						type: 'number',
						placeholder: 'H',
						style: { padding: '0px 8px' },
					},
				],
				validations: [
					{
						type: 'required',
						message: 'Dimensions is required',
						inputType: 'group',
					},
				],
			},

			{
				name: 'weight',
				label: 'Weight per package',
				type: 'number',
				isShowStepper: false,
				showMessage: false,
				showLabel: false,
				showMargin: false,
				style: { padding: '0px 8px' },
				span: 3,
				validations: [{ type: 'required', message: 'Weight is required' }],
			},
		],
	},
];

export default controls;
