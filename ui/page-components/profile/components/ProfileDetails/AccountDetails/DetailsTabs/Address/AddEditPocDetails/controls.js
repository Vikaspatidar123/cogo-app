const getControls = () => [
	{
		name: 'name',
		label: 'Name',
		type: 'text',
		span: 12,
		placeholder: 'Name',
		rules: { required: true },
	},
	{
		name: 'email',
		label: 'Email',
		type: 'text',
		span: 12,
		placeholder: 'Email',
		rules: { required: true },
	},
	{
		name: 'phone_number',
		label: 'Phone Number',
		type: 'mobile-number-select',
		inputType: 'number',
		select2: 'new',
		span: 12,
		placeholder: 'Phone Number',
		rules: {
			required: true,
			validate: (value) => (value?.country_code && value?.number
				? undefined
				: 'accountDetail'
			),
		},
	},
	{
		name: 'alternate_phone_number',
		label: 'alternate_phone_number',
		type: 'mobile-number-select',
		inputType: 'number',
		select2: 'new',
		span: 12,
		placeholder: 'alternate_phone_number',
	},
];

export default getControls;
