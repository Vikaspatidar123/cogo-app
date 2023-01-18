const AirCustom = [
	{
		name: 'locations',
		type: 'fieldArray',
		value: [
			{
				location_id: '',
				trade_type: '',
				total_teus: '',
			},
		],
		noDeleteButtonTill: 1,
		span: 12,
		deleteBtnSpan: 0.5,
		controls: [
			{
				type: 'location-select',
				params: {
					filters: {
						type: ['airport', 'country'],
					},
				},
				name: 'location_id',
				label: 'Location',
				includedInOptions: false,
				span: 4.5,
				optionsListKey: 'locations',
				grouped: ['city', 'country'],
				placeholder: 'Search location...',
				rules: { required: 'Origin is required' },
			},
			{
				name: 'trade_type',
				label: 'Trade Type',
				type: 'select',
				placeholder: 'Select',
				span: 3.5,
				optionsListKey: 'trade-types',
				rules: {
					required: true,
				},
			},
			{
				name: 'total_teus',
				label: 'Total Kgs (yearly)',
				placeholder: 'Kgs',
				type: 'select',
				span: 3.5,
				options: [
					{ value: '0-50', label: '0-50' },
					{ value: '50-100', label: '50-100' },
					{ value: '100-500', label: '100-500' },
					{ value: '500-1000', label: '500-1000' },
					{ value: '1000+', label: 'over 1000' },
				],
				rules: {
					required: 'Required',
				},
			},
		],
	},
	{
		name: 'cargo_types',
		type: 'fieldArray',
		value: [
			{
				cargo_type: '',
			},
		],
		noDeleteButtonTill: 1,
		span: 6,
		controls: [
			{
				type: 'select',
				name: 'cargo_type',
				label: 'Cargo Type',
				commodityType: 'air_freight',
				caret: true,
				optionsListKey: 'commodities',
				placeholder: 'Select cargo type...',
				rules: { required: 'Cargo Type is required' },
				span: 11,
			},
		],
	},
];

export default AirCustom;
