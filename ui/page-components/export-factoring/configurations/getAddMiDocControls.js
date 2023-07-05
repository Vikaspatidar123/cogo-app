const controls = [
	{
		name        : 'mi_number',
		label       : 'Reference Number',
		type        : 'text',
		placeholder : 'Enter Insurance Number',
		span        : 6,
		rules       : {
			required: true,
		},
	},
	{
		name        : 'insuring_party_name',
		label       : 'Insurance Party Name',
		type        : 'text',
		placeholder : 'Type Here',
		span        : 6,
		rules       : { required: 'Date is required' },
	},
	{
		name       : 'marine_insurance',
		label      : 'Upload Document',
		type       : 'file',
		drag       : true,
		span       : 6,
		uploadType : 'aws',
		accept     : '.pdf',
		maxSize    : '5242880',
		height     : 76,
		rules      : { required: true },
	},
];

export const getAddMiDocControls = () => controls.map((control) => ({ ...control }));
