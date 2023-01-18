const LclCustom = [
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
						type: ['seaport', 'country', 'trade'],
					},
				},
				name: 'location_id',
				includedInOptions: false,
				optionsListKey: 'locations',
				grouped: ['city', 'country'],
				span: 4.5,
				label: 'Location',
				placeholder: 'Search location...',
				rules: { required: 'Location is required' },
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
				label: 'Total TEU (yearly)',
				placeholder: 'TEU',
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

export default LclCustom;
