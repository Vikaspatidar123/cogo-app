const FclFreight = [
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
						type: ['seaport', 'country', 'trade'],
					},
				},
				name: 'origin_location_id',
				label: 'Origin',
				span: 4,
				includedInOptions: false,
				optionsListKey: 'locations',
				grouped: ['city', 'country'],
				placeholder: 'Search location...',
				rules: { required: 'Origin is required' },
			},
			{
				type: 'location-select',
				params: {
					filters: {
						type: ['seaport', 'country', 'trade'],
					},
				},
				name: 'destination_location_id',
				label: 'Destination',
				includedInOptions: false,
				span: 4,
				optionsListKey: 'locations',
				grouped: ['city', 'country'],
				placeholder: 'Search location...',
				rules: { required: 'Destination is required' },
			},
			{
				name: 'total_teus',
				label: 'Total TEUS (yearly)',
				type: 'select',
				span: 3.5,
				placeholder: 'TEUs',
				rules: { required: 'Total TEUS  is required' },
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
		name: 'shipping_lines',
		type: 'fieldArray',
		value: [
			{
				shipping_line_id: ' ',
			},
		],
		noDeleteButtonTill: 1,
		span: 6,
		showBorder: true,
		controls: [
			{
				type: 'select2',
				name: 'shipping_line_id',
				optionsListKey: 'shipping-lines',
				caret: true,
				label: 'Shipping Line',
				placeholder: 'Search shipping line...',
				rules: { required: 'Shipping Line is required' },
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
				cargo_type: ' ',
			},
		],
		span: 6,
		controls: [
			{
				type: 'select',
				name: 'cargo_type',
				label: 'Cargo Type',
				placeholder: 'Select cargo type...',
				options: [
					{ label: 'Refer', value: 'refer' },
					{ label: 'Special equipment', value: 'special_equipment' },
					{ label: 'Haz', value: 'haz' },
					{ label: 'Dry', value: 'dry' },
					{ label: 'Others', value: 'others' },
				],
				rules: { required: 'Cargo Type is required' },
				span: 11,
			},
		],
	},
];
export default FclFreight;
