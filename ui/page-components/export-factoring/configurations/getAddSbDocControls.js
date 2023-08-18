const controls = [
	{
		name        : 'sb_number',
		label       : 'Shipping Bill Number',
		type        : 'text',
		placeholder : 'Enter here',
		span        : 6,
		rules       : {
			required: true,
		},
	},
	{
		name                  : 'sb_date',
		label                 : 'Shipping Bill Date',
		type                  : 'datepicker',
		maxDate               : new Date(),
		isPreviousDaysAllowed : true,
		placeholder           : 'DD-MM-YYYY',
		span                  : 6,
		rules                 : { required: true },
	},
	{
		name       : 'shipping_bill',
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

export const getAddSbDocControls = () => controls.map((control) => ({ ...control }));
