const getControls = () => {
	const controls = [
		{
			name               : 'line_items',
			type               : 'fieldArray',
			showButtons        : false,
			showDivider        : false,
			noDeleteButtonTill : 1,
			lineColor          : '#f2f2f2',
			value              : [
				{
					code       : 'BAS',
					currency   : '',
					buy_price  : '',
					sell_price : '',
					unit       : 'per_container',
				},
			],
			controls: [
				{
					name        : 'code',
					type        : 'select',
					options     : [{ value: 'BAS', label: 'Basic Freight (BAS)' }],
					value       : 'BAS',
					className   : 'primary sm',
					placeholder : 'Select Line Items',
					rules       : { required: 'This is required' },
					disabled    : true,
					span        : 2.2,
				},
				{
					name        : 'unit',
					type        : 'select',
					options     : [{ value: 'per_container', label: 'Per Container' }],
					value       : 'per_container',
					className   : 'primary sm',
					placeholder : 'Select Unit',
					rules       : { required: 'This is required' },
					disabled    : true,
					span        : 2.2,
				},
				{
					name           : 'currency',
					type           : 'select',
					placeholder    : 'Select Currency',
					className      : 'primary sm',
					rules          : { required: 'This is required' },
					span           : 2.2,
					optionsListKey : 'currencies',
				},
				{
					name        : 'sell_price',
					type        : 'number',
					placeholder : 'Enter Sell Price',
					className   : 'primary sm',
					rules       : { required: 'This is required', min: 1 },
					span        : 2.2,
				},
			],
		},
	];

	return controls;
};

export default getControls;
