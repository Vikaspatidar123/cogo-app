const controls = [
	{
		name  : 'halt_time_value',
		type  : 'number',
		size  : 'md',
		style : { width: '100px' },
	},
	{
		name        : 'halt_time_unit',
		type        : 'select',
		placeholder : 'Unit',
		style       : { width: '150px' },
		caret       : false,
		options     : [
			{
				label : 'Days',
				value : 'days',
			},
			{
				label : 'Hours',
				value : 'hours',
			},
			{
				label : 'Minutes',
				value : 'minutes',
			},
		],
	},
];

export default controls;
