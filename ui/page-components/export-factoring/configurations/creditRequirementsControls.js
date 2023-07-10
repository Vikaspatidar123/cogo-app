export const creditRequirementsControls = [

	// {
	// 	name     : 'sales_credit_amount_currency',
	// 	label    : 'Currency',
	// 	type     : 'select',
	// 	value    : 'USD',
	// 	span     : 6,
	// 	options  : [{ label: 'USD', value: 'USD' }],
	// 	disabled : true,
	// 	rules    : {
	// 		required: true,
	// 	},
	// },
	// {
	// 	name        : 'sales_credit_amount',
	// 	label       : 'Sales Recommendation Sellers Limit',
	// 	type        : 'number',
	// 	placeholder : 'Enter Sellers Limit',
	// 	rules       : {
	// 		max      : '30000000',
	// 		required : true,
	// 		validate : (value) => (Number.isInteger(Number(value || 0))
	// 			? undefined
	// 			: 'Enter valid amount'),
	// 	},
	// },
	{
		name     : 'credit_amount_currency',
		label    : 'Currency',
		type     : 'select',
		value    : 'USD',
		options  : [{ label: 'USD', value: 'USD' }],
		span     : 6,
		disabled : true,

	},
	{
		name        : 'credit_amount',
		label       : 'Customer Recommendation Sellers Limit',
		type        : 'number',
		placeholder : 'Enter Sellers Limit',
		span        : 6,
		rules       : {
			max      : '30000000',
			validate : (value) => (Number.isInteger(Number(value || 0))
				? undefined
				: 'Enter valid amount'),
		},
	},
];
