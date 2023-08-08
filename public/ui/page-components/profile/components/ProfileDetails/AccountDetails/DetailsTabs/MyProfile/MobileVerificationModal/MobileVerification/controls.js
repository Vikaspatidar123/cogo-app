const getControls = ({ t }) => [
	{
		name        : 'mobileNumber',
		label       : t('settings:mobile_number_verification_label'),
		type        : 'mobile_number',
		inputType   : 'number',
		placeholder : t('settings:mobile_number_verification_placeholder'),
		rules       : {
			required: t('settings:settings_field_required_text'),
		},
	},
];
export default getControls;
