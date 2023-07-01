export const ADDPOC_CONTROLS = [
	{
		name        : 'name',
		placeholder : 'Full Name',
		type        : 'text',
		rules       : {
			required: true,
		},
	},
	{
		name        : 'mobile_number',
		placeholder : 'Mobile',
		type        : 'mobile_number',
		rules       : {
			required: true,
		},
	},
	{
		name        : 'email',
		placeholder : 'Email',
		type        : 'text',
		rules       : {
			required: true,
		},
	},
	{
		name        : 'designation',
		label       : 'Designation',
		placeholder : 'Enter Designation',
		type        : 'select',
		showLabel   : false,
		options     : [
			{
				label : 'Owner',
				value : 'owner',
			},
			{
				label : 'Financial Head',
				value : 'financial_head',
			},
			{
				label : 'Logistics Head',
				value : 'logistics_head',
			},
			{
				label : 'Expo Head',
				value : 'expo_head',
			},
			{
				label : 'Ops Head',
				value : 'ops_head',
			},
			{
				label : 'Proprietorship',
				value : 'proprietorship',
			},
			{
				label : 'Director',
				value : 'director',
			},
			{
				label : 'Partner',
				value : 'partner',
			},
			{
				label : 'MD',
				value : 'md',
			},
			{
				label : 'CEO',
				value : 'ceo',
			},
			{
				label : 'CFO',
				value : 'cfo',
			},
			{
				label : 'Other',
				value : 'other',
			},
		],
		rules: {
			required: true,
		},
	},
];
