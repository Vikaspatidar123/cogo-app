const controls = [
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

export const getAddCommercialInvoiceControls = () => controls.map((control) => ({ ...control }));
