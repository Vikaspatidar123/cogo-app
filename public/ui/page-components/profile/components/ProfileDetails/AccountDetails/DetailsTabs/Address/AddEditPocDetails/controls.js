const getControls = ({ t }) => [
	{
		name        : 'name',
		label       : t('settings:address_add_control_label_1'),
		type        : 'text',
		style       : { width: '360px' },
		placeholder : t('settings:address_add_control_placeholder_1'),
		rules       : { required: t('settings:settings_field_required_text') },
	},
	{
		name        : 'email',
		label       : t('settings:address_add_control_label_2'),
		type        : 'text',
		style       : { width: '360px' },
		placeholder : t('settings:address_add_control_placeholder_2'),
		rules       : { required: t('settings:settings_field_required_text') },

	},
	{
		name        : 'phone_number',
		label       : t('settings:address_add_control_label_3'),
		type        : 'mobile_number',
		inputType   : 'number',
		select2     : 'new',
		style       : { width: '230px' },
		placeholder : t('settings:address_add_control_placeholder_3'),
		rules       : {
			required : t('settings:settings_field_required_text'),
			validate : (value) => (value?.country_code && value?.number
				? undefined
				: 'accountDetail'
			),
		},
	},
	{
		name        : 'alternate_phone_number',
		label       : t('settings:address_add_control_label_4'),
		type        : 'mobile_number',
		inputType   : 'number',
		select2     : 'new',
		style       : { width: '230px' },
		placeholder : t('settings:address_add_control_placeholder_4'),
	},
];

export default getControls;
