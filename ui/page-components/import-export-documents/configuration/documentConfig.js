const documentConfig = [
	{
		name           : 'exportCountry',
		label          : 'Country of Export',
		placeholder    : 'Type here ..',
		type           : 'select',
		optionsListKey : 'country-list-with-flag',
		rules          : { required: true },
	},
	{
		name           : 'importCountry',
		label          : 'Country of Import',
		placeholder    : 'Type here ..',
		type           : 'select',
		optionsListKey : 'country-list-with-flag',
		rules          : { required: true },
	},
	{
		name        : 'transportMode',
		label       : 'Mode of Transport',
		placeholder : 'Type here ..',
		type        : 'select',
		options     : [
			{ label: 'Ocean', value: 'ocean' },
			{ label: 'Air', value: 'air' },
		],
		rules: { required: true },
	},
	{
		name           : 'manufacturingCountry',
		label          : 'Country of Manufacturing',
		placeholder    : 'Type here ..',
		sublabel       : 'Optional',
		type           : 'select',
		optionsListKey : 'country-list-with-flag',
	},
	{
		name        : 'hsCode',
		label       : 'HS Code',
		placeholder : 'Type here ..',
		sublabel    : 'Optional',
		type        : 'number',
		// rules: { required: true },
	},
	{
		name : 'productName',
		type : 'hidden',
	},
];

export default documentConfig;
