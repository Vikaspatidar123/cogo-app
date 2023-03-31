const formControls = (setOperatorName) => [
	{
		label             : 'LOCALS LOCATION',
		name              : 'airport_id',
		placeholder       : 'Search via airport name/code',
		includedInOptions : false,
		type              : 'async_select',
		asyncKey          : 'locations',
		grouped           : ['city'],
		params            : { filters: { type: ['airport', 'city'] } },
		rules             : { required: 'AirPort is required' },
		style             : { width: '350px' },
	},
	{
		label             : 'LOCALS TYPE (HANDLING TYPE)',
		name              : 'trade_type',
		type              : 'select',
		placeholder       : 'Select Locals type',
		showArrow         : false,
		includedInOptions : false,
		options           : [
			{ label: 'Origin', value: 'export' },
			{ label: 'Destination', value: 'import' },
		],
		rules : { required: 'Locals Type is required' },
		style : { width: '350px' },
	},
	{
		label         : 'Commodity',
		name          : 'commodity',
		type          : 'chips',
		commodityType : 'air_customs',
		value         : 'all_commodity',
		rules         : { required: 'Commodity is required' },
	},
	{
		name           : 'airline_id',
		type           : 'select',
		optionsListKey : 'air-lines',
		defaultOptions : true,
		caret          : true,
		handleChange   : (obj) => {
			setOperatorName(obj);
		},
		label       : 'Preferred Air lines',
		multiple    : false,
		placeholder : 'Search Airline',
		rules       : {
			required: ' AirLine is required',
		},
	},
	{
		label       : 'Packages count',
		name        : 'packages_count',
		placeholder : 'Enter packages count',
		type        : 'number',
		optionLabel : 'package',
		value       : 1,
		rules       : { min: 1, max: 10000 },
	},
	{
		label    : 'Weight',
		name     : 'weight',
		subLabel : '(kgs)',
		span     : 4,
		type     : 'number',
		value    : 1,
		rules    : { required: 'Weight is required', min: 0.000000001 },
	},
	{
		label    : 'Volume',
		name     : 'volume',
		span     : 4,
		subLabel : '(cbm)',
		type     : 'number',
		value    : 1,
		rules    : { required: 'Required', min: 0.0000000001 },
	},
	{
		label : '',
		name  : 'cbm_calculator',
		span  : 4,
		type  : 'cbm_calculator',
	},
];

export default formControls;
