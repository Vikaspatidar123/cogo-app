import patterns from '@/ui/commons/configurations/patterns';

export const pocOptions = [
	{
		value : 'existing_poc',
		label : 'Existing POC',
	},
	{
		value : 'create_new',
		label : 'Create new Poc',
	},
];

export const controls = (designation_options) => [
	{
		name        : 'name',
		label       : 'POC Name',
		type        : 'text',
		className   : 'primary md',
		span        : 6,
		placeholder : 'Enter your POC Name',
		rules       : {
			required: 'Name is required',
		},
	},
	{
		type           : 'select',
		options        : designation_options,
		caret          : true,
		multiple       : true,
		name           : 'work_scopes',
		label          : 'Workscopes',
		showOriginIcon : true,
		placeholder    : 'Choose workscope Type',
		className      : 'primary md',
		span           : 6,
		rules          : {
			required: 'Workscope is Required',
		},
	},
	{
		name        : 'email',
		label       : 'Email Address',
		type        : 'email',
		className   : 'primary md',
		span        : 6,
		placeholder : 'Enter Email Address',
		rules       : {
			required : 'Email is required',
			pattern  : {
				value   : patterns.EMAIL,
				message : 'Email is invalid',
			},
		},
	},
	{
		name        : 'mobile_number',
		label       : 'Mobile Number',
		type        : 'mobile-number-select',
		className   : 'primary md',
		span        : 6,
		placeholder : 'Enter your POC mobile',
		rules       : {
			required: 'Mobile Number is required',
		},
		select2: 'new small',
	},
	{
		name        : 'alternate_mobile_number',
		label       : 'Alternate Mobile Number (optional)',
		type        : 'mobile-number-select',
		className   : 'primary md',
		span        : 6,
		placeholder : 'Enter your Alternate POC mobile',
		select2     : 'new small',
	},
];
