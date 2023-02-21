const getPocControls = ({ t = () => {} }) => {
	return [
		{
			type: 'text',
			name: 'name',
			label: t(
				'profile:accountDetails.tabOptions.tradeParty.addressList.pocList.savePocDetails.form.controls.name.label',
			),
			rules: { required: true },
			span: 4,
		},
		{
			type: 'email',
			name: 'email',
			label: t(
				'profile:accountDetails.tabOptions.tradeParty.addressList.pocList.savePocDetails.form.controls.email.label',
			),
			rules: { required: true },
			span: 4,
		},
		{
			type: 'mobile-number-select',
			name: 'mobile_number',
			label: t(
				'profile:accountDetails.tabOptions.tradeParty.addressList.pocList.savePocDetails.form.controls.mobile.label',
			),
			codeKey: 'mobile_country_code',
			numberKey: 'mobile_number',
			rules: { required: true },
			span: 4,
		},
	];
};

export default getPocControls;
