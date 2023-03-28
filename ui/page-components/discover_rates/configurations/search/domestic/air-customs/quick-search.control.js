const controls = [
	{
		label       : 'Packages count',
		name        : 'packages_count',
		placeholder : 'Enter packages count',
		type        : 'number',
		value       : 1,
		rules       : { min: 1, max: 10000 },
	},
	{
		label : 'Weight',
		name  : 'weight',
		type  : 'number',
		value : 1,
		rules : { required: 'Weight is required', min: 0.1, max: 10000 },
	},
	{
		label : 'Volume',
		name  : 'volume',
		type  : 'number',
		value : 1,
		rules : { required: 'Volume is required', min: 0.1, max: 10000 },
	},
];

export default controls;
