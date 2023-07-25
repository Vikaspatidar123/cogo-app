import patterns from '@/ui/commons/configurations/patterns';

const controls = [
	{
		name        : 'name',
		type        : 'text',
		span        : 12,
		label       : 'Name',
		placeholder : 'Enter Name',
		size        : 'lg',
	},
	{
		label       : 'Mobile Number',
		name        : 'mobile_number',
		placeholder : 'Enter Mobile Number',
		type        : 'mobile_number',
		span        : 12,
		size        : 'lg',
	},
	{
		name        : 'email',
		label       : 'Email Address',
		type        : 'email',
		span        : 12,
		placeholder : 'Enter Email Address',
		theme       : 'admin',
		className   : 'primary lg',
		size        : 'lg',
		rules       : {
			pattern: {
				value   : patterns.EMAIL,
				message : 'Invalid Email Address',
			},
		},
	},
	{
		label       : 'Work Scopes',
		name        : 'work_scopes',
		placeholder : 'Select Work Scopes',
		type        : 'select',
		span        : 12,
		size        : 'lg',
		options     : [
			{ label: 'Finance Manager', value: 'i_am_finance_manager' },
			{ label: 'Logistics Manager', value: 'i_am_logistics_manager' },
			{ label: 'Operation Manager', value: 'i_am_operation_manager' },
			{ label: 'Owner', value: 'i_am_owner' },
		],
	},
];

export default controls;
