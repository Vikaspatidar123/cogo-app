import patterns from '@/ui/commons/configurations/patterns';

const getControls = ({ t }) => [
	{
		label : t('settings:personal_information_label_5'),
		name  : 'password',
		type  : 'text',
		span  : 12,
		rules : {
			required : t('settings:settings_field_required_text'),
			pattern  : {
				value   : patterns.PASSWORD.PASSWORD_PATTERN,
				message : 'password is invalid',
			},
		},
	},
	{
		name  : 'confirmPassword',
		label : t('settings:password_control_label_2'),
		type  : 'text',
		span  : 12,
		rules : {
			required: t('settings:settings_field_required_text'),
		},
	},
];

export default getControls;
