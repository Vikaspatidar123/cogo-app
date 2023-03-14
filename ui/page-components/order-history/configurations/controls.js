const CONTROLS = {
	fields: [
		{
			key   : 'orderNumber',
			label : 'Order Number',
			span  : 2,
		},
		{
			key   : 'requestType',
			label : 'Service Type',
			span  : 2,
		},
		{
			key        : 'orderDate',
			label      : 'Order Date',
			span       : 2,
			sorting    : true,
			func       : 'renderDate',
			sortingKey : 'CREATED_AT',
		},
		{
			key   : 'status',
			label : 'Status',
			span  : 2.5,
			func  : 'renderStatus',
		},
		{
			key   : 'paymentType',
			label : 'Payment Mode',
			span  : 2.5,
		},
		{
			key   : 'dot',
			label : '',
			span  : 0.5,
			func  : 'renderDots',
		},
	],
};

export default CONTROLS;
