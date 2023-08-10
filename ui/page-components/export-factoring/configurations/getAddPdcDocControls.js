const controls = [
	{
		name       : 'postdated_cheque',
		label      : 'Upload PDC Document',
		type       : 'file',
		drag       : true,
		span       : 6,
		uploadType : 'aws',
		accept     : '.pdf,.jpg,.jpeg',
		maxSize    : '5242880',
		height     : 76,
		rules      : { required: true },
	},
];
export const getAddPdcDocControls = () => controls.map((control) => ({ ...control }));
