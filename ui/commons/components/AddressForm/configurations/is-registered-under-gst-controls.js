const getIsAddressRegisteredControls = ({ t = () => {} }) => {
	const translationKey =
		'common:components.addressForm.configurations.isRegisteredUnderGstControls';
	return [
		{
			type: 'checkbox',
			name: 'isAddressRegisteredUnderGst',
			label: t(`${translationKey}.options.1`),
			options: [{ value: true, label: t(`${translationKey}.options.1`) }],
			multiple: true,
			// // span: 6,
			style: {
				flexBasis: '100%',
			},
		},
	];
};

export default getIsAddressRegisteredControls;
