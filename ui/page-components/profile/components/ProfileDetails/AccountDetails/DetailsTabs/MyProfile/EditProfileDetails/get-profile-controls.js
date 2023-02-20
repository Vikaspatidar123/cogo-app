const getProfileControls = ({ userDetails = {} }) => [
	{
		name         : 'name',
		label        : 'Name',
		type         : 'text',
		span         : 4,
		placeholder  : 'Enter Name',
		showOptional : false,
		value        : userDetails.name,
	},
	{
		name         : 'phone_number',
		label        : 'Phone Number',
		placeholder  : 'Eneter Phone Number',
		type         : 'mobile-number-select',
		inputType    : 'number',
		select2      : 'new',
		span         : 4,
		showOptional : false,
		value        : {
			country_code : userDetails.mobile_country_code,
			number       : userDetails.mobile_number,
		},
	},
	{
		name         : 'date_of_birth',
		label        : 'Date',
		placeholder  : 'Enter Date',
		type         : 'datepicker',
		span         : 4,
		showOptional : false,
		value        : new Date(userDetails.birth_date),
		maxDate      : new Date(),
	},
	{
		name  : 'email',
		label : 'Email',
		type  : 'email',
		size  : 'lg',
		span  : 4,
		rules : {
			pattern: {
				// value   : geo.regex.EMAIL,
				message: 'Email',
			},
		},
		showOptional : false,
		value        : userDetails.email,
	},
	{
		name           : 'work_scopes',
		label          : 'Work Scopes',
		type           : 'select',
		optionsListKey : 'work-scopes',
		multiple       : true,
		autoCloseMenu  : false,
		span           : 4,
		showOptional   : false,
		value          : userDetails.work_scopes,
	},
	{
		name           : 'preferred_languages',
		label          : 'Preferred Languages',
		placeholder    : 'Enter Preferred Languages',
		span           : 4,
		type           : 'select',
		caret          : true,
		optionsListKey : 'languages',
		multiple       : true,
		autoCloseMenu  : false,
		showOptional   : false,
		value          : userDetails.preferred_languages,
	},
	{
		name         : 'picture',
		label        : 'Picture',
		drag         : true,
		type         : 'file',
		format       : ' ',
		uploadType   : 'aws',
		span         : 4,
		accept       : '.png,.pdf,.jpg,.jpeg',
		showOptional : false,
		value        : userDetails.picture,
	},
	{
		name  : 'alternate_mobile_numbers',
		type  : 'fieldArray',
		span  : 8,
		value : [
			{
				mobile_number: {
					country_code : '',
					number       : '',
				},
			},
		],
		noDeleteButtonTill : 1,
		controls           : [
			{
				name        : 'mobile_number',
				label       : 'Mobail Number',
				type        : 'mobile_number',
				inputType   : 'number',
				select2     : 'new',
				placeholder : 'Enter Mobail Number',
			},
		],
	},
];

export default getProfileControls;
