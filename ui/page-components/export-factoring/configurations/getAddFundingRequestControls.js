const controls = [
	{
		name           : 'sid',
		type           : 'select',
		placeholder    : 'Select...',
		defaultOptions : true,
		label          : 'Select SID',
		rules          : { required: 'SID is required' },
	},
	{
		name        : 'buyer_name',
		type        : 'select',
		placeholder : 'Select Buyers...',
		label       : 'Buyer name',
		// options: buyerOptions,
		rules       : { required: 'Buyer is required' },
	},
	{
		name        : 'exporter_bank_account_id',
		type        : 'select',
		placeholder : 'Select Bank..',
		label       : 'Disbursal Bank Details',
		// options: bankDetailsOptions,
		rules       : { required: 'Buyer is required' },
	},
	{
    	name               : 'addInvoice',
		type               : 'fieldArray',
		showButtons        : true,
		buttonText         : 'Add',
		noDeleteButtonTill : 1,
		value              : [{}],
		controls           : [
			{
				name        : 'invoice_no',
				type        : 'text',
				placeholder : 'Commercial Invoice No.',
				label       : 'Commercial Invoice No.',
				span        : 6,
				rules       : { required: 'Commercial Invoice No. is required' },
			},
			{
				name        : 'credit_limit',
				type        : 'price_select',
				placeholder : 'Invoice Amount',
				label       : 'Gross Invoice Amount',
				span        : 6,
				rules       : { required: 'Credit Limit is required' },
			},
		],
	},
];

export const getAddFundingRequestControls = () => controls.map((control) => ({ ...control }));
