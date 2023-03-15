const getControls = () => [
	{
		name        : 'name',
		label       : 'Name',
		type        : 'text',
		style       : { width: '360px' },
		placeholder : 'Enter name',
		rules       : { required: true },
	},
	{
		name        : 'email',
		label       : 'Email',
		type        : 'text',
		style       : { width: '360px' },
		placeholder : 'Enter email',
		rules       : { required: true },

	},
	{
		name        : 'phone_number',
		label       : 'Mobile Number		',
		type        : 'mobile_number',
		inputType   : 'number',
		select2     : 'new',
		style       : { width: '230px' },
		placeholder : 'Enter mobile number',
		rules       : {
			required : true,
			validate : (value) => (value?.country_code && value?.number
				? undefined
				: 'accountDetail'
			),
		},
	},
	{
		name        : 'alternate_phone_number',
		label       : 'Alternate Mobile Number',
		type        : 'mobile_number',
		inputType   : 'number',
		select2     : 'new',
		style       : { width: '230px' },
		placeholder : 'Enter alternate mobile number',
	},
];

export default getControls;
