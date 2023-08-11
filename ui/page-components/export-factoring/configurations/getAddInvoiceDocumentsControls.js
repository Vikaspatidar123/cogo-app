const controls = [
	{
		name        : 'ci_number',
		label       : 'CI Number',
		type        : 'text',
		placeholder : 'Enter CI Number',
		span        : 6,
		rules       : {
			required: true,
		},
	},
	{
		name                  : 'ci_date',
		label                 : 'CI Date',
		type                  : 'datepicker',
		placeholder           : '',
		span                  : 6,
		isPreviousDaysAllowed : true,
		rules                 : { required: true },
	},
	{
		name        : 'invoice_amount',
		label       : 'Gross Invoice Amount',
		type        : 'price_select',
		placeholder : 'Enter Gross Invoice Amount',
		span        : 4,
		rules       : {
			required: true,
		},
	},
	{
		name        : 'prior_payment',
		label       : 'Prior Payments (if any)',
		type        : 'number',
		placeholder : 'Type here',
		span        : 6,
	},
	{
		name        : 'payment_term',
		label       : 'Payment Terms',
		type        : 'select',
		placeholder : 'Payment Terms',
		span        : 6,
		rules       : { required: 'This is required' },
		options     : [
			{
				label : 'Cash Against Documents',
				value : 'Cash Against Documents',
			},
			{
				label : 'Document Against Payment',
				value : 'Document Against Payment',
			},
			{
				label : 'Document Against Acceptance',
				value : 'Document Against Acceptance',
			},
			{
				label : 'Letter of Credit',
				value : 'Letter of Credit',
			},
			{
				label : 'Open Account',
				value : 'Open Account',
			},
			{
				label : 'Advance Payment',
				value : 'Advance Payment',
			},
		],
	},
	{
		name                  : 'due_date',
		label                 : 'Due Date',
		type                  : 'datepicker',
		placeholder           : '',
		span                  : 6,
		maxDate               : new Date(),
		isPreviousDaysAllowed : true,
		rules                 : { required: true },
	},
	{
		name       : 'commercial_invoice',
		label      : 'Upload Document',
		type       : 'file',
		drag       : true,
		span       : 6,
		height     : 76,
		uploadType : 'aws',
		accept     : '.pdf',
		maxSize    : '5242880',
		rules      : { required: true },
	},
];

export const getAddInvoiceDocumentsControls = () => controls.map((control) => ({ ...control }));
