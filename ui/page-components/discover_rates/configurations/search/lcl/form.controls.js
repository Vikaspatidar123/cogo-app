const controls = [
	{
		label             : 'Origin Port',
		name              : 'origin_port_id',
		placeholder       : 'Search via port name/code',
		includedInOptions : false,
		type              : 'async_select',
		asyncKey          : 'locations',
		grouped           : ['city', 'country'],
		params            : { filters: { type: ['seaport', 'country', 'city'] } },
		rules             : { required: 'Origin port is required' },
		// style             : { width: '300px' },
	},
	{
		label             : 'Destination Port',
		name              : 'destination_port_id',
		placeholder       : 'Search via port name/code',
		includedInOptions : false,
		type              : 'async_select',
		asyncKey          : 'locations',
		grouped           : ['city', 'country'],
		params            : { filters: { type: ['seaport', 'country', 'city'] } },
		rules             : { required: 'Destination port is required' },
		// style             : { width: '300px' },
	},
	{
		label         : 'Commodity',
		name          : 'commodity',
		type          : 'chips',
		collapse      : true,
		commodityType : 'lcl_freight',
		rules         : { required: 'Commodity is required' },
	},
	{
		label      : '',
		name       : 'inco_term',
		type       : 'inco-terms-select',
		selectType : 'chips',
		rules      : { required: 'Inco-term is required' },
	},
	{
		label : 'Packages count',
		name  : 'packages_count',
		value : 1,
		type  : 'number',
		rules : { min: 1, max: 10000 },
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

export default controls;
