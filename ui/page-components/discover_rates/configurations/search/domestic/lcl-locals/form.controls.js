const formControls = (setOperatorName) => [
	{
		label: 'LOCALS LOCATION',
		name: 'location_id',
		placeholder: 'Search via name',
		includedInOptions: false,
		type: 'location-select',
		optionsListKey: 'locations',
		params: { filters: { type: ['city', 'seaport'] } },
		rules: { required: 'Port is required' },
	},
	{
		label: 'LOCALS TYPE (HANDLING TYPE)',
		name: 'trade_type',
		type: 'location-select',
		placeholder: 'Select locals Type',
		showArrow: false,
		includedInOptions: false,
		options: [
			{ label: 'Origin', value: 'export' },
			{ label: 'Destination', value: 'import' },
		],
		rules: { required: 'Locals Type is required' },
	},
	{
		label: 'Commodity',
		name: 'commodity',
		type: 'pills',
		commodityType: 'lcl_freight',
		collapse: true,
		value: 'general',
		rules: { required: 'Commodity is required' },
	},
	{
		name: 'shipping_line_id',
		label: 'Shipping Line',
		type: 'select',
		placeholder: 'Select Shipping Line',
		optionsListKey: 'shipping-lines',
		caret: true,
		handleChange: (obj) => {
			setOperatorName(obj);
		},
		isClearable: true,
		multiple: false,
		span: 12,
		rules: {
			required: 'Shippling Line is required',
		},
	},
	{
		label: 'Packages count',
		name: 'packages_count',
		value: 1,
		rules: { min: 1, max: 10000 },
		type: 'number',
	},
	{
		label: 'Weight',
		name: 'weight',
		subLabel: '(kgs)',
		span: 4,
		type: 'number',
		value: 1,
		rules: { required: 'Weight is required', min: 0.000000001 },
	},
	{
		label: 'Volume',
		name: 'volume',
		span: 4,
		subLabel: '(cbm)',
		type: 'number',
		value: 1,
		rules: { required: 'Required', min: 0.0000000001 },
	},
	{
		label: '',
		name: 'cbm_calculator',
		span: 4,
		type: 'cbm_calculator',
	},
];

export default formControls;
