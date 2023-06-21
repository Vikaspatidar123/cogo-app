const HEADER = [
	{
		label          : 'Country',
		name           : 'country',
		type           : 'async_select',
		placeholder    : 'Enter Site/Entity',
		asyncKey       : 'locations',
		defaultOptions : true,
		params         : {
			filters: {
				type: ['country'],
			},
		},
		theme     : 'admin',
		className : 'primary md',
	},
	{
		label       : 'Search By',
		name        : 'search',
		type        : 'select',
		placeholder : 'Search By',
		options     : [
			{ label: 'HS Code', value: 'hscode' },
			{ label: 'Product', value: 'product' },
		],
	},
];

export default HEADER;
