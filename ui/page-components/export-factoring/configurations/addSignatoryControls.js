export const ADDSIGNATORY_CONTROLS = [
	{
		name        : 'signatory_name',
		placeholder : 'Signatory Name',
		type        : 'text',
		rules       : {
			required: true,
		},
	},
	{
		name        : 'signatory_mobile_number',
		placeholder : 'Mobile',
		type        : 'mobile_number',
		rules       : {
			required: true,
		},
	},
	{
		name        : 'signatory_email',
		placeholder : 'Email',
		type        : 'text',
		rules       : {
			required: true,
		},
	},
	{
		name        : 'upload_proof',
		placeholder : 'Upload Board of Resolution',
		accept      : '.png,.pdf,.jpg,.jpeg',
		type        : 'file',
		themeType   : 'accent',
		rules       : {
			required: true,
		},
	},
];
