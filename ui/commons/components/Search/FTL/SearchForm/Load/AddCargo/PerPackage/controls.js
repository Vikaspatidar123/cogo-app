const controls = [
	{
		name: 'packages',
		type: 'fieldArray',
		className: 'primary md',
		buttonText: 'Add More Packages',
		noDeleteButtonTill: 1,
		value: [
			{
				package_type: '',
				packages_count: '',
				package_weight: '',
				handling_type: '',
			},
		],
		controls: [
			{
				name: 'packing_type',
				span: 4,
				type: 'select',
				label: 'Package Type',
				className: 'primary md',
				rules: { required: 'Package Type is required' },
				options: [
					{
						label: 'Pallet',
						value: 'pallet',
					},
					{
						label: 'Box',
						value: 'box',
					},
					{
						label: 'Crate',
						value: 'crate',
					},
					{
						label: 'Loose',
						value: 'loose',
					},
				],
			},

			{
				name: 'packages_count',
				label: 'Quantity',
				type: 'number',
				className: 'primary md',
				span: 4,
				rules: { required: true },
			},

			{
				name: 'package_weight',
				label: 'Weight per package',
				suffix: 'kgs',
				className: 'primary md',
				type: 'number',
				span: 4,
				rules: { required: true },
			},

			{
				name: 'dimensions',
				label: 'Dimensions (in cm)',
				type: 'input-group',
				subLabel: 'CM',
				className: 'primary md',
				span: 8,
				style: { marginLeft: '1px', marginRight: '1px' },
				inputControls: [
					{
						name: 'length',
						type: 'number',
						placeholder: 'L',
						className: 'primary md',
						style: { marginRight: '1px' },
					},
					{
						name: 'width',
						type: 'number',
						placeholder: 'W',
						className: 'primary md',
						style: { marginRight: '1px' },
					},
					{
						name: 'height',
						type: 'number',
						placeholder: 'H',
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
					required: true,
					validate: (value) => {
						return value?.length && value?.width && value?.height
							? undefined
							: 'Dimension is Required';
					},
				},
			},

			{
				name: 'handling_type',
				label: 'Handling',
				type: 'select',
				className: 'primary md',
				span: 4,

				rules: { required: 'Handling Type is required' },
				options: [
					{
						label: 'Stackable',
						value: 'stackable',
					},
					{
						label: 'Non-Stackable',
						value: 'non_stackable',
					},
				],
				style: {
					menu: {
						right: 0,
						background: 'white',
						boxShadow: '0 4px 80px rgba(0, 0, 0, 0.15)',
						borderRadius: 10,
						zIndex: 99999,
					},
				},
			},
		],
	},
];

export default controls;
