export const CreateControls = [
	{
		name       : 'file_type',
		type       : 'radio',
		radioGroup : true,
		span       : 12,
		value      : 'manual_entry',
		options    : [
			{ label: 'Manual Entry to request', value: 'manual_entry' },
			{ label: 'Upload Excel in cogo format', value: 'cogo_format' },
			{ label: 'Upload Request in any format', value: 'unstructured' },
		],
		rules: { required: 'This field is Required' },
	},
];

export const UploadFileControls = (isCogoFormat) => [
	{
		name       : 'search_type',
		type       : 'radio',
		span       : 12,
		radioGroup : true,
		options    : [
			{ label: 'FCL FREIGHT', value: 'fcl_freight' },
			{ label: 'LCL FREIGHT', value: 'lcl_freight' },
			{ label: 'AIR FREIGHT', value: 'air_freight' },
		],
		rules: { required: 'This field is Required' },
	},
	{
		name            : 'file_url',
		type            : 'file',
		showProgress    : true,
		onlyURLOnChange : true,
		drag            : true,
		height          : 200,
		span            : 12,
		// uploadIcon      : 'ic-upload',
		accept          : isCogoFormat
			? '.csv'
			: `image/*,.pdf,.doc,.docx,.xlsx,.csv,application/msword,application
            /vnd.openxmlformats-officedocument.wordprocessingml.document`,
		belowText: isCogoFormat
			? 'supports - only csv'
			: 'supports - images,pdf,docs,csv',
		rules: { required: 'Upload file is required' },
	},
];
