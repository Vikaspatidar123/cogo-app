export const creditRequirementsControls = [
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
		placeholder : 'Enter Limit',
		span        : 6,
		rules       : {
			max      : '30000000',
			validate : (value) => (Number.isInteger(Number(value || 0))
				? undefined
				: 'Enter valid amount'),
		},
	},
];
