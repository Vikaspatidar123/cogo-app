const LclFreight = [
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
				name: 'origin_location_id',
				type: 'location-select',
				params: {
					filters: {
						type: ['seaport', 'country', 'trade'],
					},
				},
				includedInOptions: false,
				optionsListKey: 'locations',
				grouped: ['city', 'country'],
				span: 4,
				label: 'Origin',
				placeholder: 'Search location...',
				rules: { required: 'Origin is required' },
			},
			{
				name: 'destination_location_id',
				type: 'location-select',
				params: {
					filters: {
						type: ['seaport', 'country', 'trade'],
					},
				},
				includedInOptions: false,
				optionsListKey: 'locations',
				grouped: ['city', 'country'],
				caret: true,
				label: 'Destination',
				span: 4,
				showDestinationIcon: true,
				placeholder: 'Search location...',
				rules: { required: 'Destination is required' },
			},
			{
				name: 'total_teus',
				label: 'Total TEUS (yearly)',
				type: 'select',
				placeholder: 'TEUs',
				span: 3.5,
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
				rules: { required: 'Cargo Type  is required' },
				span: 11,
			},
		],
	},
];
export default LclFreight;
