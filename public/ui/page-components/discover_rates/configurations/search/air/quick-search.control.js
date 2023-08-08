const controls = [
	{
		label        : '',
		name         : 'inco_term',
		type         : 'inco-terms-select',
		selectType   : 'chips',
		incoTermType : 'air_freight',
		rules        : { required: 'Inco-term is required' },
	},
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
		span  : 6,
		type  : 'number',
		value : 1,
		rules : { required: 'Weight is required', min: 0.1 },
	},
	{
		label : 'Volume',
		name  : 'volume',
		span  : 6,
		type  : 'number',
		value : 1,
		rules : { required: 'Volume is required', min: 0.1 },
	},
];

export default controls;
