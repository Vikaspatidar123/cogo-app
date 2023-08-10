const controls = [
	{
		name        : 'po_number',
		label       : 'PO Number',
		type        : 'text',
		placeholder : 'Enter PO Number',
		span        : 6,
		rules       : {
			required: true,
		},
	},
	{
		name                  : 'po_date',
		label                 : 'PO Date',
		type                  : 'datepicker',
		placeholder           : 'DD-MM-YYYY',
		span                  : 6,
		maxDate               : new Date(),
		isPreviousDaysAllowed : true,
		rules                 : { required: true },
	},
	{
		name       : 'purchase_order',
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

export const getAddPoDocControls = () => controls.map((control) => ({ ...control }));
