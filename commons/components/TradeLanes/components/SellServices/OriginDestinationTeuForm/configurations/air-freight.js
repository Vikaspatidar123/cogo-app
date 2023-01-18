const AirFreight = [
	{
		name: 'location_pairs',
		noDeleteButtonTill: 1,
		type: 'fieldArray',
		value: [
			{
				origin_location_id: '',
				destination_location_id: '',
				total_teus: '',
			},
		],
		span: 12,
		deleteBtnSpan: 0.5,
		controls: [
			{
				type: 'location-select',
				params: {
					filters: {
						type: ['airport', 'country', 'trade'],
					},
				},
				caret: true,
				name: 'origin_location_id',
				label: 'Origin',
				span: 4,
				optionsListKey: 'locations',
				grouped: ['city', 'country'],
				placeholder: 'Search location...',
				rules: { required: 'Origin is required' },
			},
			{
				type: 'location-select',
				params: {
					filters: {
						type: ['airport', 'country', 'trade'],
					},
				},
				name: 'destination_location_id',
				span: 4,
				optionsListKey: 'locations',
				grouped: ['city', 'country'],
				label: 'Destination',
				placeholder: 'Search location...',
				rules: { required: 'Destination is required' },
			},
			{
				name: 'total_teus',
				span: 3.5,
				label: 'Total Kgs (yearly)',
				type: 'select',
				placeholder: 'Kgs',
				rules: { required: 'Total Kgs  is required' },
				options: [
					{ label: '0 - 50', value: '0 - 50' },
					{ label: '50 - 100', value: '50 - 100' },
					{ label: '100 - 500', value: '100 - 500' },
					{ label: '500 - 1000', value: '500 - 1000 ' },
					{ label: 'Over 1000', value: 'Over 1000+' },
				],
			},
		],
	},
	{
		name: 'airlines',
		type: 'fieldArray',
		noDeleteButtonTill: 1,
		value: [
			{
				airline_id: '',
			},
		],
		span: 6,
		showBorder: true,
		controls: [
			{
				type: 'select2',
				optionsListKey: 'air-lines',
				defaultOptions: true,
				caret: true,
				name: 'airline_id',
				label: 'Airline',
				placeholder: 'Search airline...',
				rules: { required: 'Airlines is required' },
				span: 11,
			},
		],
	},
	{
		name: 'cargo_types',
		type: 'fieldArray',
		noDeleteButtonTill: 1,
		value: [
			{
				cargo_type: '',
			},
		],
		span: 6,
		controls: [
			{
				type: 'select',
				optionsListKey: 'commodities',
				name: 'cargo_type',
				commodityType: 'air_freight',
				label: 'Cargo Type',
				placeholder: 'Select cargo type...',
				rules: { required: 'Cargo Type is required' },
				span: 11,
			},
		],
	},
];

export default AirFreight;
