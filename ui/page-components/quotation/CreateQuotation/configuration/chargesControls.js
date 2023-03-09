const chargesControls = [
	{
		name        : 'incoterm',
		placeholder : 'IncoTerm',
		label       : 'IncoTerm',
		type        : 'select',
		size        : 'sm',
		className   : 'incotermForm',
		options     : [
			{ label: 'FOB', value: 'FOB' },
			{ label: 'EXW', value: 'EXW' },
			{ label: 'FCA', value: 'FCA' },
			{ label: 'FAS', value: 'FAS' },
			{ label: 'CIF', value: 'CIF' },
			{ label: 'CFR', value: 'CFR' },
			{ label: 'CPT', value: 'CPT' },
			{ label: 'CIP', value: 'CIP' },
			{ label: 'DAT', value: 'DAT' },
			{ label: 'DAP', value: 'DAP' },
			{ label: 'DDP', value: 'DDP' },
		],
		rules: { required: true },
	},
	{
		name        : 'basicFreightCharges',
		placeholder : 'Freight',
		label       : 'Basic Freight',
		type        : 'number',
		min         : 0,
		size        : 'sm',
		className   : 'inputForm',
		isClearable : true,
		rules       : {
			required : true,
			min      : {
				value   : 0,
				message : 'Should be greater than or equal to 0',
			},
		},
	},
	{
		name        : 'dutiesAndTaxes',
		placeholder : 'Duties & Taxes',
		label       : 'Duties & Taxes',
		type        : 'number',
		min         : 0,
		size        : 'sm',
		className   : 'inputForm',
		isClearable : true,
		rules       : {
			required : true,
			min      : {
				value   : 0,
				message : 'Should be greater than or equal to 0',
			},
		},
	},
	{
		name        : 'insurance',
		placeholder : 'Insurance',
		label       : 'Insurance',
		type        : 'number',
		min         : 0,
		size        : 'sm',
		className   : 'inputForm',
		isClearable : true,
		rules       : {
			required: true,
		},
	},
	{
		name     : 'incotermCharges',
		id       : 'incotermCharges',
		type     : 'fieldArray',
		controls : [
			{
				name        : 'name',
				placeholder : 'Charges',
				type        : 'chargeName',
				size        : 'sm',
				rules       : { required: true },
			},
			{
				name        : 'value',
				placeholder : 'value',
				min         : 1,
				size        : 'sm',
				type        : 'number',
				rules       : {
					required : true,
					min      : {
						value   : 1,
						message : 'Should be greater than 0',
					},
				},
			},
		],
	},
	{
		name     : 'additionalCharges',
		id       : 'additionalCharges',
		type     : 'fieldArray',
		controls : [
			{
				name        : 'name',
				placeholder : 'Charges',
				type        : 'text',
				rules       : { required: true },
			},
			{
				name        : 'value',
				placeholder : 'value',
				type        : 'number',
				min         : 1,
				rules       : {
					required : true,
					min      : {
						value   : 1,
						message : 'Should be greater than 0',
					},
				},
			},
		],
	},
	{
		name        : 'comments',
		label       : 'Additional Notes',
		placeholder : 'Enter Remarks...',
		type        : 'textarea',
		className   : 'bg_fff',
	},
];

export default chargesControls;
