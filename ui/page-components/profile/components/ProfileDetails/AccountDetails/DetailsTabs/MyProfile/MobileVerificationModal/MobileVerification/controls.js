const getControls = () => [
	{
		name        : 'mobileNumber',
		label       : 'Mobile Number',
		type        : 'mobile_number',
		inputType   : 'number',
		placeholder : 'Mobile Number*',
		rules       : {
			required: true,
		},
	},
];
export default getControls;
