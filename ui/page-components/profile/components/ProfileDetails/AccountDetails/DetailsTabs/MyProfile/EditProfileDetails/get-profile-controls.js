import getWorkScopes from '../../../../configurations/work-scopes';

import languages from '@/ui/commons/configurations/languages';

const getProfileControls = ({ userDetails = {} }) => [
	{
		name         : 'name',
		label        : 'Name',
		type         : 'text',
		style        : { width: '300px' },
		placeholder  : 'Enter Name',
		showOptional : false,
		value        : userDetails.name,
	},
	{
		name         : 'phone_number',
		label        : 'Phone Number',
		placeholder  : 'Eneter Phone Number',
		type         : 'mobile_number',
		inputType    : 'number',
		style        : { width: '180px' },
		showOptional : false,
		value        : {
			country_code : userDetails.mobile_country_code,
			number       : userDetails.mobile_number,
		},
	},
	{
		name                  : 'date_of_birth',
		label                 : 'Date',
		placeholder           : 'Enter Date',
		type                  : 'datepicker',
		style                 : { width: '300px' },
		value                 : new Date(userDetails.birth_date),
		mxnDate               : new Date(),
		isPreviousDaysAllowed : true,
	},
	{
		name  : 'email',
		label : 'Email',
		type  : 'text',
		style : { width: '300px' },
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
		name     : 'work_scopes',
		label    : 'Role in Company',
		type     : 'multi_select',
		asyncKey : 'work-scopes',
		style    : { width: '300px' },
		value    : userDetails.work_scopes,
		options  : getWorkScopes(),
		multiple : true,
	},
	{
		name        : 'preferred_languages',
		label       : 'Preferred Languages',
		placeholder : 'Enter Preferred Languages',
		style       : { width: '300px' },
		type        : 'multi_select',
		asyncKey    : 'languages',
		value       : userDetails.preferred_languages,
		options     : languages,
		multiple    : true,
	},
	{
		name         : 'picture',
		label        : 'Picture',
		drag         : true,
		type         : 'file',
		format       : ' ',
		uploadType   : 'aws',
		style        : { width: '300px' },
		accept       : '.png,.pdf,.jpg,.jpeg',
		showOptional : false,
		value        : userDetails.picture,
	},
	{
		name  : 'alternate_mobile_numbers',
		type  : 'fieldArray',
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
				label       : 'Alternate Mobail Number',
				type        : 'mobile_number',
				inputType   : 'number',
				select2     : 'new',
				placeholder : 'Enter Mobail Number',
			},
		],
	},
];

export default getProfileControls;
