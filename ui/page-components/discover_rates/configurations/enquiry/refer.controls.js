const referControls = () => [
	{
		name  : 'refer_temperature',
		label : 'Temperature (°C)',
		type  : 'number',
		span  : 6,
		rules : { required: 'Required', min: -35, max: 30 },
	},
	{
		name  : 'refer_humidity',
		label : 'Humidity (%)',
		span  : 6,
		type  : 'number',
		rules : { required: 'Required', min: 0, max: 100 },
	},
	{
		name  : 'refer_ventilation',
		label : 'Ventilation (%)',
		type  : 'number',
		span  : 6,
		rules : { required: 'Required', min: 0, max: 100 },
	},
	{
		name    : 'refer_vent_setting',
		label   : 'Vent Settings',
		type    : 'pills',
		span    : 6,
		options : [
			{ value: 'open', label: 'Open' },
			{ value: 'close', label: 'Close' },
		],
		rules: { required: 'Required' },
	},
];
export default referControls;
