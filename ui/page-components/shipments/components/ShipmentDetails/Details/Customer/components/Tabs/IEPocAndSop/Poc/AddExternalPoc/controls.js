import patterns from '@/ui/commons/configurations/patterns';

export const controls = (process_options, designation_options) => [
	{
		type           : 'select',
		options        : process_options,
		caret          : true,
		multiple       : true,
		name           : 'processes',
		label          : 'Process',
		showOriginIcon : true,
		placeholder    : 'Choose Process',
		className      : 'primary md',
		span           : 6,
		rules          : {
			required: 'Process is Required',
		},
	},
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
		label          : 'Workscope',
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
	{
		type           : 'select',
		optionsListKey : 'locations',
		params         : {
			filters: {
				type: ['city'],
			},
		},
		caret          : true,
		name           : 'origin_location_id',
		label          : 'Location / Branch Name',
		showOriginIcon : true,
		placeholder    : 'Enter Location',
		className      : 'primary md',
		span           : 6,
		rules          : {
			required: 'City is Required',
		},
	},
];
