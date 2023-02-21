const getConfigPocControls = ({ t = () => {} }) => {
	const translationKey =
		'common:components.addressForm.configurations.pocControls';
	return [
		{
			type: 'text',
			name: 'name',
			label: t(`${translationKey}.name.label`),
			rules: { required: true },
			style: {
				flexBasis: '25%',
			},
		},
		{
			type: 'email',
			name: 'email',
			label: t(`${translationKey}.email.label`),
			rules: { required: true },
			style: {
				flexBasis: '25%',
			},
		},
		{
			type: 'mobile-number-select',
			name: 'mobile_number',
			label: t(`${translationKey}.mobile_number.label`),
			codeKey: 'mobile_country_code',
			numberKey: 'mobile_number',
			rules: { required: true },
			style: {
				flexBasis: '50%',
			},
		},
	];
};
export default getConfigPocControls;
