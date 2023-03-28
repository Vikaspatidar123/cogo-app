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
			{ value: 'prepaid', label: 'Prepaid' },
			{ value: 'collect', label: 'Collect' },
		],
		type: 'pills',
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
		span       : 5,
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
		type    : 'pills',
		options : [
			{ label: 'Direct', value: 'direct' },
			{ label: 'Trans-shipment', value: 'transhipment' },
		],
	},
];

export default controls;
