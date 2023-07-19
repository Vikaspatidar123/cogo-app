import getWorkScopes from '../../../../configurations/work-scopes';

import languages from '@/ui/commons/configurations/languages';

const getProfileControls = ({ userDetails = {}, t }) => [
	{
		name         : 'name',
		label        : t('settings:address_add_control_label_1'),
		type         : 'text',
		style        : { width: '300px' },
		placeholder  : t('settings:address_add_control_placeholder_1'),
		showOptional : false,
		value        : userDetails.name,
	},
	{
		name         : 'phone_number',
		label        : t('settings:profile_controls_label_1'),
		placeholder  : t('settings:profile_controls_placeholder_1'),
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
		label                 : t('settings:profile_controls_label_2'),
		placeholder           : t('settings:profile_controls_placeholder_2'),
		type                  : 'datepicker',
		style                 : { width: '300px' },
		value                 : new Date(userDetails.birth_date),
		mxnDate               : new Date(),
		isPreviousDaysAllowed : true,
	},
	{
		name         : 'email',
		label        : t('settings:address_add_control_label_2'),
		type         : 'text',
		style        : { width: '300px' },
		showOptional : false,
		value        : userDetails.email,
	},
	{
		name     : 'work_scopes',
		label    : t('settings:profile_controls_label_3'),
		type     : 'multi_select',
		asyncKey : 'work-scopes',
		style    : { width: '300px' },
		value    : userDetails.work_scopes,
		options  : getWorkScopes({ t }),
		multiple : true,
	},
	{
		name        : 'preferred_languages',
		label       : t('settings:profile_controls_label_4'),
		placeholder : t('settings:profile_controls_placeholder_4'),
		style       : { width: '300px' },
		type        : 'multi_select',
		asyncKey    : 'languages',
		value       : userDetails.preferred_languages,
		options     : languages,
		multiple    : true,
	},
	{
		name         : 'picture',
		label        : t('settings:profile_controls_label_5'),
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
				label       : t('settings:address_add_control_label_4'),
				type        : 'mobile_number',
				inputType   : 'number',
				select2     : 'new',
				placeholder : t('settings:billing_details_placeholder_12'),
			},
		],
	},
];

export default getProfileControls;
