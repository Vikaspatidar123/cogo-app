const controls = [
	{
		name               : 'packages',
		type               : 'fieldArray',
		className          : 'primary md',
		buttonText         : 'Add More Packages',
		// style              : { width: '100px' },
		noDeleteButtonTill : 1,
		controls           : [
			{
				name      : 'packing_type',
				span      : 4,
				type      : 'select',
				label     : 'Package Type',
				className : 'primary md',
				rules     : { required: 'Package Type is required' },
				options   : [
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
				name      : 'packages_count',
				label     : 'Quantity',
				type      : 'number',
				className : 'primary md',
				span      : 4,
				rules     : { required: true },
			},

			{
				name      : 'package_weight',
				label     : 'Weight per package',
				suffix    : <span style={{ fontSize: '11px' }}>kgs</span>,
				className : 'primary md',
				type      : 'number',
				span      : 4,
				rules     : { required: true },
			},

			{
				name          : 'dimensions',
				label         : 'Dimensions (in cm)',
				type          : 'input-group',
				// subLabel      : 'CM',
				className     : 'primary md',
				span          : 8,
				style         : { marginLeft: '1px', marginRight: '1px' },
				inputControls : [
					{
						name        : 'length',
						type        : 'number',
						placeholder : 'L',
						className   : 'primary md',
						style       : { marginRight: '1px' },
					},
					{
						name        : 'width',
						type        : 'number',
						placeholder : 'W',
						className   : 'primary md',
						style       : { marginRight: '1px' },
					},
					{
						name        : 'height',
						type        : 'number',
						placeholder : 'H',
					},
				],
				rules: {
					required : true,
					validate : (value) => (value?.length && value?.width && value?.height
						? undefined
						: 'Dimension is Required'),
				},
			},

			{
				name      : 'handling_type',
				label     : 'Handling',
				type      : 'select',
				className : 'primary md',
				span      : 4,
				rules     : { required: 'Handling Type is required' },
				options   : [
					{
						label : 'Stackable',
						value : 'stackable',
					},
					{
						label : 'Non-Stackable',
						value : 'non_stackable',
					},
				],
				// style: {
				// 	menu: {
				// 		right        : 0,
				// 		background   : 'white',
				// 		boxShadow    : '0 4px 80px rgba(0, 0, 0, 0.15)',
				// 		borderRadius : 10,
				// 		zIndex       : 99999,
				// 	},
				// },
			},
		],
	},
];

export default controls;
