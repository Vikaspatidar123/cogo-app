const controls = [
	{
		name       : 'truck_type',
		label      : '',
		type       : 'truck-type-select',
		selectType : 'pills',
		rules      : { required: 'Truck Type is required' },
	},
	{
		name  : 'trucks_count',
		label : 'Number of Trucks',
		type  : 'number',
		rules : { min: 1, required: 'Number of Trucks is required' },
	},
];

export default controls;
