const otherAddressesControls = [
	{
		name  : 'name',
		label : 'Billing Party Name ',
		type  : 'text',
		span  : 6,
		rules : { required: true },
	},
	{
		name    : 'address_type',
		label   : 'Address Type',
		type    : 'select',
		span    : 6,
		options : [
			{
				label : 'Office',
				value : 'office',
			},
			{
				label : 'Factory Address',
				value : 'factory',
			},
			{
				label : 'Warehouse Address',
				value : 'warehouse',
			},
		],
		rules: { required: true },
	},
	{
		name      : 'country_id',
		label     : 'Country',
		type      : 'select',
		optionKey : 'countries',
		span      : 6,
		rules     : { required: true },
	},
	{
		name     : 'pincode',
		label    : 'Pincode',
		labelKey : 'postal_code',
		valueKey : 'postal_code',
		type     : 'async_select',
		asyncKey : 'locations',
		params   : { filters: { type: ['pincode'] } },
		caret    : true,
		span     : 6,
		rules    : { required: true },
	},

	{
		name  : 'address',
		label : 'Billing Address',
		type  : 'textarea',
		span  : 6,
		rules : { required: true },
	},
];

export default otherAddressesControls;
