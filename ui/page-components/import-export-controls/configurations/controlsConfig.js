const controlsConfig = [
	{
		name        : 'importCountry',
		label       : 'Country of Import',
		placeholder : 'Select Country',
		type        : 'async_select',
		asyncKey    : 'country_list_with_flag',
		rules       : { required: true },
		initialCall : true,
	},
	{
		name        : 'exportCountry',
		label       : 'Country of Export',
		placeholder : 'Select Country',
		type        : 'async_select',
		asyncKey    : 'country_list_with_flag',
		rules       : { required: true },
		initialCall : true,
	},
	{
		name        : 'transportMode',
		label       : 'Mode of Transport',
		placeholder : 'Select Transport Mode',
		type        : 'select',
		options     : [
			{ label: 'Ocean', value: 'ocean' },
			{ label: 'Air', value: 'air' },
		],
		rules: { required: true },
	},
	{
		name        : 'manufacturingCountry',
		label       : 'Country of Manufacturing',
		placeholder : 'Select Country',
		sublabel    : 'Optional',
		type        : 'async_select',
		asyncKey    : 'country_list_with_flag',
		initialCall : true,
	},
	{
		name        : 'importHsCode',
		label       : 'Import HS Code',
		placeholder : 'Select Hs Code',
		type        : 'number',
		rules       : { required: true },
	},
	{
		name        : 'exportHsCode',
		label       : 'Export HS Code',
		placeholder : 'Select Hs Code',
		type        : 'number',
		rules       : { required: true },
	},
	{
		name        : 'productUse',
		label       : 'Product End Use',
		placeholder : 'Select Product End Use',
		type        : 'select',
		options     : [
			{ label: 'Military', value: 'military' },
			{ label: 'Commercial', value: 'commercial' },
		],
		rules: { required: true },
	},
	{
		name : 'productName',
		type : 'hidden',
	},
];

export default controlsConfig;
