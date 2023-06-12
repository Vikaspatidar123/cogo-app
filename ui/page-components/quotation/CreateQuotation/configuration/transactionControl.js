const transactionControl = [
	{
		label       : 'Incoterm',
		name        : 'incoterm',
		type        : 'text',
		placeholder : 'Enter Incoterm',
		rules       : {
			required: '*Required',
		},
		disabled: true,
	},
	{
		label       : 'Consignment Value',
		name        : 'consignment',
		type        : 'number',
		placeholder : 'Enter Consignment',
		rules       : {
			required: '*Required',
		},
		disabled: true,
	},
	{
		label       : 'Result Currency',
		name        : 'result',
		type        : 'text',
		placeholder : 'Enter Result Currency',
		rules       : {
			required: '*Required',
		},
		disabled: true,
	},
	{
		label       : 'Total Applicable Charges',
		name        : 'applicable',
		type        : 'number',
		placeholder : 'Enter Total Applicable Charges',
		rules       : {
			required: '*Required',
		},
		disabled: true,
	},
];

export default transactionControl;
