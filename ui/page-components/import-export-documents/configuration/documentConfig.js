const documentConfig = [
	{
		name: 'exportCountry',
		label: 'Country of Export',
		placeholder: 'Type here ..',
		asyncKey: 'country_list_with_flag',
		type: 'async_select',
		rules: { required: true },
	},
	{
		name: 'importCountry',
		label: 'Country of Import',
		placeholder: 'Type here ..',
		asyncKey: 'country_list_with_flag',
		type: 'async_select',
		rules: { required: true },
	},
	{
		name: 'transportMode',
		label: 'Mode of Transport',
		placeholder: 'Type here ..',
		type: 'select',
		options: [
			{ label: 'Ocean', value: 'ocean' },
			{ label: 'Air', value: 'air' },
		],
		rules: { required: true },
	},
	{
		name: 'manufacturingCountry',
		label: 'Country of Manufacturing',
		placeholder: 'Type here ..',
		sublabel: 'Optional',
		asyncKey: 'country_list_with_flag',
		type: 'async_select',
	},
	{
		name: 'hsCode',
		label: 'HS Code',
		placeholder: 'Type here ..',
		sublabel: 'Optional',
		type: 'number',
	},
	{
		name: 'productName',
		type: 'hidden',
	},
];

export default documentConfig;
