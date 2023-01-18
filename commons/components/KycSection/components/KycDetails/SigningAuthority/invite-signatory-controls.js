const controls = [
	{
		name: 'name',
		label: 'Name',
		type: 'text',
		span: 4,
		placeholder: 'Enter Name',
		rules: {
			required: true,
		},
	},
	{
		label: 'Mobile Number',
		name: 'phone_number',
		placeholder: 'Enter Mobile Number',
		type: 'mobile-number-select',
		inputType: 'number',
		numberKey: 'mobile_number',
		codeKey: 'mobile_country_code',
		span: 4,
		select2: 'new',
		rules: {
			required: true,
		},
	},
	{
		name: 'email',
		label: 'Email Address',
		type: 'text',
		span: 4,
		placeholder: 'Enter Email Address',
		rules: {
			required: true,
		},
	},
];

export default controls;
