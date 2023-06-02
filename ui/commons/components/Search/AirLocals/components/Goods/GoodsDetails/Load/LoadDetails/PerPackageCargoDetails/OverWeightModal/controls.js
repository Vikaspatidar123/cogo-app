const controls = [
	{
		name            : 'certificates',
		showProgress    : true,
		onlyURLOnChange : true,
		accept:
			'image/*,.pdf,.doc,.docx,application/msword,'
			+ 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
		uploadType  : 'aws',
		themeType   : 'secondary',
		validations : [{ type: 'required', message: 'Mandatory' }],
		type        : 'file',
		drag        : true,
		label       : 'Upload packing list',
		span        : 12,
		height      : 44,
		// value: dangerous_goods?.msds_document,
		rules       : {
			required: true,
		},
	},
];

export default controls;
