const formControlsAdvanced = (isChannelPartner = false) => [
	// export
	{
		name    : 'export_transportation_pickup_type',
		label   : 'Pickup Type',
		type    : 'chips',
		options : [
			{ children: 'FTL', key: 'ftl' },
			{ children: 'LTL', key: 'ltl' },
		],
		condition : { services: ['export_transportation'] },
		rules     : { required: 'Pickup Type is required' },
		style     : { width: '350px' },
	},
	{
		label       : 'Pickup Pincode',
		name        : 'export_transportation_location_id',
		placeholder : 'Search via pincode',
		type        : 'async_select',
		asyncKey    : 'locations',
		grouped     : ['city'],
		params      : { filters: { type: ['pincode', 'city'] } },
		condition   : { services: ['export_transportation'] },
		rules       : { required: 'Pickup Pincode is required' },
	},
	{
		name      : 'export_transportation_truck_type',
		label     : 'Pickup Truck Type',
		type      : 'select',
		optionKey : 'truck_types',
		style     : { width: '350px' },
		condition : {
			services                          : ['export_transportation'],
			export_transportation_pickup_type : 'ftl',
		},
		rules: { required: 'Truck Type is required' },
	},
	{
		name      : 'export_transportation_trucks_count',
		label     : 'Truck Count',
		type      : 'number',
		style     : { width: '350px' },
		condition : {
			services                          : ['export_transportation'],
			export_transportation_pickup_type : 'ftl',
		},
		rules: { required: 'Trucks is required', min: 1 },
	},
	{
		label       : 'Address',
		name        : 'export_transportation_address',
		placeholder : 'Enter address',
		type        : 'text',
		condition   : { services: ['export_transportation'] },

	},
	// {
	// 	name: 'export_transportation_packages',
	// 	type: 'fieldArray',
	// 	showButtons: true,
	// 	label: 'Choose Package Information',
	// 	buttonText: 'Add Package',
	// 	value: [
	// 		{
	// 			packages_count: 1,
	// 			packing_type: 'pallet',
	// 			dimensions: { length: 1, width: 1, height: 1 },
	// 		},
	// 	],
	// 	controls: [
	// 		{
	// 			label: 'Type',
	// 			name: 'packing_type',
	// 			placeholder: 'Select',
	// 			type: 'select',
	// 			options: [
	// 				{ label: 'Pallet', value: 'pallet' },
	// 				{ label: 'Box', value: 'box' },
	// 			],
	// 			rules: { required: 'Required' },
	// 			span: 3,
	// 		},
	// 		{
	// 			name: 'dimensions',
	// 			label: 'Dimensions',
	// 			type: 'input-group',
	// 			subLabel: 'CM',
	// 			span: 6,
	// 			style: { marginLeft: '1px', marginRight: '1px' },
	// 			inputControls: [
	// 				{
	// 					name: 'length',
	// 					type: 'number',
	// 					placeholder: 'L',
	// 					style: { marginRight: '1px' },
	// 				},
	// 				{
	// 					name: 'width',
	// 					type: 'number',
	// 					placeholder: 'W',
	// 					style: { marginRight: '1px' },
	// 				},
	// 				{
	// 					name: 'height',
	// 					type: 'number',
	// 					placeholder: 'H',
	// 				},
	// 			],
	// 			rules: { required: 'Required', inputType: 'group' },
	// 		},
	// 		{
	// 			label: 'Count',
	// 			name: 'packages_count',
	// 			placeholder: '(min 1, max 10000)',
	// 			watch: true,
	// 			type: 'number',
	// 			style: { padding: '0px 2px' },
	// 			span: 2,
	// 			rules: { required: '*', max: 10000, min: 1 },
	// 		},
	// 	],
	// 	condition: {
	// 		services: ['export_transportation'],
	// 		export_transportation_pickup_type: 'ltl',
	// 	},
	// },

	// import
	{
		name    : 'import_transportation_pickup_type',
		label   : 'Drop Type',
		type    : 'chips',
		value   : isChannelPartner ? null : 'ftl',
		options : [
			{ children: 'FTL', key: 'ftl' },
			{ children: 'LTL', key: 'ltl' },
		],
		condition : { services: ['import_transportation'] },
		rules     : { required: 'Drop Type is required' },
		style     : { width: '350px' },
	},
	{
		label       : 'Drop Pincode',
		name        : 'import_transportation_location_id',
		placeholder : 'Search via pincode',
		type        : 'async_select',
		asyncKey    : 'locations',
		grouped     : ['city'],
		params      : { filters: { type: ['pincode', 'city'] } },
		condition   : { services: ['import_transportation'] },
		rules       : { required: 'Destination Pincode is required' },
	},
	{
		name      : 'import_transportation_truck_type',
		label     : 'Drop Truck Type',
		type      : 'select',
		optionKey : 'truck_types',
		style     : { width: '350px' },
		condition : {
			services                          : ['import_transportation'],
			import_transportation_pickup_type : 'ftl',
		},
		rules: { required: 'Truck Type is required' },
	},
	{
		name      : 'import_transportation_trucks_count',
		label     : 'Drop Trucks Count',
		type      : 'number',
		style     : { width: '350px' },
		condition : {
			services                          : ['import_transportation'],
			import_transportation_pickup_type : 'ftl',
		},
		rules: { required: 'Trucks is required', min: 0 },
	},
	{
		label       : 'Address',
		name        : 'import_transportation_address',
		placeholder : 'Enter address',
		type        : 'text',
		condition   : { services: ['import_transportation'] },
	},
	// {
	// 	name: 'import_transportation_packages',
	// 	type: 'fieldArray',
	// 	showButtons: true,
	// 	label: 'Choose Package Information',
	// 	buttonText: 'Add Package',
	// 	value: [
	// 		{
	// 			packing_type: 'pallet',
	// 			dimensions: { length: 1, width: 1, height: 1 },
	// 			packages_count: 1,
	// 		},
	// 	],
	// 	controls: [
	// 		{
	// 			label: 'Type',
	// 			name: 'packing_type',
	// 			placeholder: 'Select',
	// 			type: 'select',
	// 			options: [
	// 				{ label: 'Pallet', value: 'pallet' },
	// 				{ label: 'Box', value: 'box' },
	// 			],
	// 			rules: { required: 'Required' },
	// 			span: 3,
	// 		},
	// 		{
	// 			name: 'dimensions',
	// 			label: 'Dimensions',
	// 			type: 'input-group',
	// 			subLabel: 'CM',
	// 			span: 6,
	// 			style: { marginLeft: '1px', marginRight: '1px' },
	// 			inputControls: [
	// 				{
	// 					name: 'length',
	// 					type: 'number',
	// 					placeholder: 'L',
	// 					style: { marginRight: '1px' },
	// 				},
	// 				{
	// 					name: 'width',
	// 					type: 'number',
	// 					placeholder: 'W',
	// 					style: { marginRight: '1px' },
	// 				},
	// 				{
	// 					name: 'height',
	// 					type: 'number',
	// 					placeholder: 'H',
	// 				},
	// 			],
	// 			rules: { required: 'Required', inputType: 'group' },
	// 		},
	// 		{
	// 			label: 'Count',
	// 			name: 'packages_count',
	// 			placeholder: '(min 1, max 10000)',
	// 			type: 'number',
	// 			style: { padding: '0px 2px' },
	// 			span: 2,
	// 			rules: { required: '*', max: 10000, min: 1 },
	// 		},
	// 	],
	// 	condition: {
	// 		services: ['import_transportation'],
	// 		import_transportation_pickup_type: 'ltl',
	// 	},
	// },
];

export default formControlsAdvanced;
