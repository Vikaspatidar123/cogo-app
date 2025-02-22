const controls = [
	{
		label             : 'Origin Location',
		name              : 'origin_location_id',
		placeholder       : 'port, airport,pincode',
		includedInOptions : false,
		type              : 'async_select',
		asyncKey          : 'locations',
		params            : { filters: { type: ['pincode', 'seaport', 'airport'] } },
		rules             : { required: 'Origin Location is required' },
	},
	{
		label             : 'Destination Location',
		name              : 'destination_location_id',
		placeholder       : 'port, airport ,pincode',
		includedInOptions : false,
		type              : 'async_select',
		asyncKey          : 'locations',
		params            : { filters: { type: ['pincode', 'seaport', 'airport'] } },
		rules             : { required: 'Destination Location is required' },
	},
	{
		label         : 'Commodity',
		name          : 'commodity',
		type          : 'chips',
		collapse      : true,
		commodityType : 'ftl_freight',
	},
	{
		name  : 'truck_type',
		label : '',
		type  : 'chips',
		rules : { required: 'Truck Type is required' },
	},
	{
		name  : 'trucks_count',
		label : 'Number of Trucks',
		type  : 'number',
		rules : { min: 1, required: 'Number of Trucks is required' },
	},
];

export default controls;
