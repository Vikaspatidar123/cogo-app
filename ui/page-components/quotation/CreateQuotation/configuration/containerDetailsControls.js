const containerDetailsControls = [
	{
		name        : 'serviceType',
		label       : 'Service Type',
		placeholder : 'Service Type',
		type        : 'select',
		options     : [
			{ label: 'FCL', value: 'FCL_FREIGHT' },
			{ label: 'LCL', value: 'LCL_FREIGHT' },
		],
		size  : 'sm',
		rules : { required: true },
	},
	{
		name        : 'containerSize',
		placeholder : 'Select Container Size',
		label       : 'Container Size',
		type        : 'select',
		options     : [
			{ label: '20 FT', value: '20FT' },
			{ label: '40 FT', value: '40FT' },
			{ label: '40 FT HC', value: '40FTHC' },
			{ label: '45 FT HC', value: '45FTHC' },
		],
		size  : 'sm',
		rules : { required: true },
	},
	{
		name        : 'containerCount',
		placeholder : 'Count',
		label       : 'Container Count',
		type        : 'number',
		className   : 'quantity',
		min         : 1,
		size        : 'sm',
		rules       : {
			required : true,
			min      : {
				value   : 1,
				message : 'Count should be greater than 0',
			},
		},
	},
	{
		name        : 'containerType',
		placeholder : 'Select Container Type',
		label       : 'Container Type',
		type        : 'select',
		options     : [
			{ label: 'STANDARD (DRY)', value: 'DRY' },
			{ label: 'REFRIGERATED (REEFER)', value: 'REFRIGERATED' },
			{ label: 'OPEN TOP', value: 'OPEN TOP' },
			{ label: 'FLAT RACK', value: 'FLAT' },
			{ label: 'ISO TANK', value: 'ISO' },
			{ label: 'OPEN SIDE (ONE DOOR OPEN)', value: 'OPEN SIDE' },
		],
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
		label       : 'Package Count',
		type        : 'number',
		className   : 'quantity',
		size        : 'sm',
		rules       : {
			required : true,
			min      : {
				value   : 1,
				message : 'Should be greater than 0',
			},
		},
	},
];

export default containerDetailsControls;
