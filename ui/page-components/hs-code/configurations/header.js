const HEADER = [
	{
		label: 'Country',
		name: 'country',
		type: 'select',
		placeholder: 'Enter Site/Entity',
		optionsListKey: 'locations',
		defaultOptions: true,
		params: {
			filters: {
				type: ['country'],
			},
		},
		theme: 'admin',
		className: 'primary md',
	},
	{
		label: 'Search By',
		name: 'search',
		type: 'select',
		placeholder: 'Search By',
		options: [
			{ label: 'HS Code', value: 'hscode' },
			{ label: 'Product', value: 'product' },
		],
	},
];

export default HEADER;
