const controls = [
	{
		name: 'halt_time_value',
		type: 'number',
		size: 'md',
		span: 5,
	},
	{
		name: 'halt_time_unit',
		type: 'select',
		placeholder: 'Unit',
		span: 7,
		caret: false,
		options: [
			{
				label: 'Days',
				value: 'days',
			},
			{
				label: 'Hours',
				value: 'hours',
			},
			{
				label: 'Minutes',
				value: 'minutes',
			},
		],
	},
];

export default controls;
