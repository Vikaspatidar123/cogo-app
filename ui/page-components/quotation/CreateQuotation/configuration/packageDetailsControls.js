const packageDetailsControls = [
	{
		name        : 'packageHandling',
		placeholder : 'Select Handling',
		label       : 'Handling',
		type        : 'select',
		options     : [
			{ label: 'Stackable', value: 'STACKABLE' },
			{ label: 'Non-Stackable', value: 'NON_STACKABLE' },
		],
		value : 'STACKABLE',
		size  : 'sm',
		rules : { required: true },
	},
	{
		name        : 'packageType',
		placeholder : 'Select Package Type',
		label       : 'Package Type',
		type        : 'select',
		options     : [
			{ label: 'Crate', value: 'CRATE' },
			{ label: 'Box', value: 'BOX' },
			{ label: 'Loose', value: 'LOOSE' },
			{ label: 'Pallet', value: 'PALLET' },
		],
		value : 'BOX',
		size  : 'sm',
		rules : { required: true },
	},
	{
		name        : 'weight',
		placeholder : 'Weight',
		label       : 'Weight (kgs)',
		type        : 'number',
		className   : 'quantity',
		min         : 0,
		size        : 'sm',
		rules       : {
			required : true,
			min      : {
				value   : 1,
				message : 'Weight should be greater than 0',
			},
		},
	},
	{
		name        : 'volume',
		placeholder : 'Volume',
		label       : 'Volume (cbm)',
		type        : 'number',
		className   : 'quantity',
		min         : 0,
		size        : 'sm',
		rules       : {
			required : true,
			min      : {
				value   : 1,
				message : 'Volume should be greater than 0',
			},
		},
	},
	{
		name        : 'quantity',
		placeholder : 'Quantity',
		label       : 'Quantity',
		type        : 'number',
		className   : 'quantity',
		size        : 'sm',
		min         : 0,
		rules       : {
			required : true,
			min      : {
				value   : 1,
				message : 'Should be greater than 0',
			},
		},
	},
];

export default packageDetailsControls;
