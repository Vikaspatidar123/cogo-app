const controls = [
	{
		name: 'sid',
		type: 'select',
		placeholder: 'Select...',
		defaultOptions: true,
		label: 'Select SID',
		span: 6,
		asyncKey: 'shipment_sid_list',
		initialCall : true,
		rules: { required: 'SID is required' },
	},
	{
		name        : 'buyer_name',
		type        : 'select',
		placeholder : 'Select Buyers...',
		label       : 'Buyer name',
		rules       : { required: 'Buyer is required' },
	},
	{
		name        : 'exporter_bank_account_id',
		type        : 'select',
		placeholder : 'Select Bank..',
		label       : 'Disbursal Bank Details',
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

export const getAddFundingRequestControls = (
	{
		creditRequest,
		buyerOptions,
		bankDetailsOptions,
	},
) => controls.map((control) => {
	if (control.name === 'sid') {
		return ({
			...control,
			params: {
				filters: {
					importer_exporter_id: creditRequest?.organization_id,
				},
			},
		});
	}
	if (control.name === 'buyer_name') {
		return ({
			...control,
			options: buyerOptions,
		});
	}
	if (control.name === 'exporter_bank_account_id') {
		return ({
			...control,
			options: bankDetailsOptions,
		});
	}

	return control;
});
