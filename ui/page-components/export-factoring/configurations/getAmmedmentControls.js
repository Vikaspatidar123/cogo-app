export const getAmmedmentControls = [
	{
		name    : 'advanceRate',
		type    : 'checkbox',
		label   : 'Advance Rate',
		span    : 6,
		options : [
			{
				label : 'Advance Rate',
				value : true,
			},
		],
		showOptional: false,
	},
	{
		name    : 'processingFee',
		type    : 'checkbox',
		span    : 6,
		label   : 'Processing Fee',
		options : [
			{
				label : 'Processing Fee',
				value : true,
			},
		],
		showOptional: false,
	},
	{
		name    : 'factoringFee',
		type    : 'checkbox',
		label   : 'Factoring Fee',
		options : [
			{
				label : 'Factoring Fee',
				value : true,
			},
		],
		showOptional: false,
	},
	{
		name    : 'interestRate',
		type    : 'checkbox',
		label   : 'Interest Rate',
		span    : 6,
		options : [
			{
				label : 'Interest Rate',
				value : true,
			},
		],
		showOptional: false,
	},
	{
		name    : 'overdueCharges',
		type    : 'checkbox',
		span    : 6,
		label   : 'Overdue Charges',
		options : [
			{
				label : 'Overdue Charges',
				value : true,
			},
		],
		showOptional : false,
		className    : 'primary lg',
	},
	{
		name    : 'gracePeriod',
		type    : 'checkbox',
		label   : 'Grace Period',
		span    : 6,
		options : [
			{
				label : 'Grace Period',
				value : true,
			},
		],
		showOptional : false,
		className    : 'primary lg',
	},
	{
		name    : 'other',
		type    : 'checkbox',
		span    : 6,
		label   : 'Other',
		options : [
			{
				label : 'Other',
				value : true,
			},
		],
		showOptional : false,
		className    : 'primary lg',
	},
	{
		name  : 'remark',
		type  : 'textarea',
		span  : 12,
		label : 'Remark',
		rules : { required: true },
	},
];
