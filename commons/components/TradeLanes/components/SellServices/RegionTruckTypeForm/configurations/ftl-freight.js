const FtlFreight = [
	{
		name: 'location_pairs',
		type: 'fieldArray',
		noDeleteButtonTill: 1,
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
						type: ['cluster', 'seaport', 'airport', 'pincode'],
					},
				},
				includedInOptions: false,
				optionsListKey: 'locations',
				grouped: ['city', 'country'],
				name: 'origin_location_id',
				label: 'Origin',
				span: 4,
				placeholder: 'Search location...',
				rules: { required: 'Origin is required' },
			},
			{
				type: 'location-select',
				params: {
					filters: {
						type: ['cluster', 'seaport', 'airport', 'pincode'],
					},
				},
				includedInOptions: false,
				optionsListKey: 'locations',
				grouped: ['city', 'country'],
				name: 'destination_location_id',
				label: 'Destination',
				span: 4,
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
		name: 'truck_types',
		type: 'fieldArray',
		noDeleteButtonTill: 1,
		value: [
			{
				truck_type: '',
			},
		],
		span: 6,
		controls: [
			{
				type: 'select',
				optionsListKey: 'truck-types',
				name: 'truck_type',
				label: 'Truck Type',
				placeholder: 'Select truck type...',
				rules: { required: 'Truck Type is required' },
				span: 11,
			},
		],
	},
];

export default FtlFreight;
