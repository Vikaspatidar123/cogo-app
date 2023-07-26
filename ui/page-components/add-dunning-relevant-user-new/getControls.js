import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const getControls = (t) => [
	{
		name        : 'name',
		type        : 'text',
		span        : 12,
		label       : t('common:rightPanel_registration_controls_name_label'),
		placeholder : t('common:rightPanel_registration_controls_name_label'),
		size        : 'lg',
		rules       : { required: t('common:rightPanel_registration_controls_name_is_required') },
	},
	{
		label       : t('common:rightPanel_tabs_mobile_controls_mobile_label'),
		name        : 'mobile_number',
		placeholder : t('common:loginField_mobile_placeholder'),
		type        : 'mobile_number',
		span        : 12,
		size        : 'lg',
		rules       : {
			required : true,
			validate : (value) => {
				const { country_code:mobileCountryCode, number:mobileNumber } = value || {};
				if (!mobileNumber || !mobileCountryCode) {
					return t('common:loginField_mobile_error');
				}
				return undefined;
			},
		},
	},
	{
		name        : 'email',
		label       : t('common:rightPanel_tabs_email_title'),
		type        : 'email',
		span        : 12,
		placeholder : t('common:loginField_email_placeholder'),
		size        : 'lg',
		rules       : {
			required : t('common:loginField_email_error'),
			pattern  : {
				value   : GLOBAL_CONSTANTS.patterns.EMAIL,
				message : t('common:invalid_email'),
			},
		},
	},
	{
		label       : t('common:work_scope_label'),
		name        : 'work_scopes',
		placeholder : t('common:work_scope_label'),
		type        : 'select',
		span        : 12,
		size        : 'lg',
		rules       : { required: t('common:required') },
		options     : [
			{ label: 'Finance Manager', value: 'i_am_finance_manager' },
			{ label: 'Logistics Manager', value: 'i_am_logistics_manager' },
			{ label: 'Operation Manager', value: 'i_am_operation_manager' },
			{ label: 'Owner', value: 'i_am_owner' },
		],
	},
];

export default getControls;
