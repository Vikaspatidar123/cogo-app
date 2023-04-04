const controls = ({ freightCurrency = 'USD' }) => [
	{
		name        : 'shipping_line_id',
		label       : 'Shipping Line',
		type        : 'select',
		placeholder : 'Shipping Line',
		span        : 12,
	},
	{
		name    : 'payment_term',
		label   : 'Payment Term',
		options : [
			{ children: 'prepaid', key: 'Prepaid' },
			{ children: 'collect', key: 'Collect' },
		],
		type: 'chips',
	},
	{
		name  : 'price_range',
		label : `Price Range(Basic Freight in ${freightCurrency})`,
		type  : 'slider',
	},
	{
		label      : 'Departure Date',
		name       : 'departure',
		type       : 'datepicker',
		pickerType : 'range',
		disabled   : false,
	},
	{
		label      : 'Arrival Date',
		name       : 'arrival',
		type       : 'datepicker',
		pickerType : 'range',
		span       : 5,
		disabled   : false,
	},

	{
		name    : 'schedule_type',
		label   : 'Shipment Type',
		type    : 'chips',
		options : [
			{ children: 'Direct', key: 'direct' },
			{ children: 'Trans-shipment', key: 'transhipment' },
		],
	},
];

export default controls;
