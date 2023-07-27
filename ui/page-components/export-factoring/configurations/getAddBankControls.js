const BANK_CONTROLS = [
	{
		name        : 'currency',
		label       : 'Currency',
		type        : 'select',
		placeholder : 'Select Currency',
		optionKey   : 'currencies',
		rules       : {
			required: true,
		},
		span: 6,
	},

	{
		name        : 'account_holder_name',
		label       : 'Account Holder Name',
		placeholder : 'Enter Account Holder Name',
		type        : 'text',
		span        : 6,
		rules       : {
			required: true,
		},
	},
	{
		name        : 'account_number',
		label       : 'Account Number',
		placeholder : 'Enter Account Number',
		type        : 'text',
		span        : 6,
		rules       : {
			required: true,
		},
	},
	{
		name        : 'bank_name',
		label       : 'Bank Name',
		placeholder : 'Enter Bank Name',
		type        : 'text',
		span        : 6,
		rules       : {
			required: true,
		},
	},
	{
		name        : 'ifsc_number',
		label       : 'IFSC Code',
		placeholder : 'Enter IFSC Code',
		type        : 'text',
		span        : 6,
		rules       : {
			required: true,
		},
	},
	{
		name        : 'swift_code',
		label       : 'Swift Code',
		placeholder : 'Enter Swift Code',
		type        : 'text',
		span        : 6,
		rules       : {
			required: true,
		},
	},
	{
		name        : 'corresponding_bank_name',
		label       : 'Corresponding Bank Name',
		placeholder : 'Enter Corresponding Bank Name',
		type        : 'text',
		span        : 6,
		rules       : {
			required: true,
		},
	},
	{
		name        : 'corresponding_swift_code',
		label       : 'Corresponding Swift Code',
		placeholder : 'Enter Corresponding Swift Code',
		type        : 'text',
		span        : 6,
		rules       : {
			required: true,
		},
	},
	{
		name         : 'aba_routing_number',
		label        : 'ABA Routing No (optional)',
		placeholder  : 'Enter ABA Routing No',
		type         : 'text',
		span         : 6,
		showOptional : true,
	},
	{
		name       : 'exporter_cheque',
		label      : 'Upload Cancelled Cheque',
		drag       : true,
		type       : 'file',
		uploadType : 'aws',
		span       : 6,
		height     : 76,
		accept     : '.pdf,',
		rules      : { required: 'Cancelled Cheque is Required' },
	},
	{
		name       : 'letter_head',
		label  	   : 'Bank details on Banks letter head',
		drag       : true,
		type       : 'file',
		uploadType : 'aws',
		span       : 6,
		height     : 76,
		accept     : '.pdf,',
		rules      : { required: 'Signed Letter Head is Required' },
	},
];

export const getAddBankControls = ({ accountType }) => BANK_CONTROLS.map((control) => {
	if (accountType === 'current_account' && control.name !== 'currency') {
		return {
			...control,
		};
	}
	if (accountType === 'eefc_account' && control.name !== 'exporter_cheque') {
		return { ...control };
	}
	return control;
});
