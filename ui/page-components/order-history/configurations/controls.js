const CONTROLS = {
	fields: [
		{
			key   : 'orderNumber',
			label : 'Order Number',
		},
		{
			key   : 'requestType',
			label : 'Service Type',
		},
		{
			key        : 'orderDate',
			label      : 'Order Date',
			sorting    : true,
			func       : 'renderDate',
			sortingKey : 'CREATED_AT',
		},
		{
			key   : 'status',
			label : 'Status',
			func  : 'renderStatus',
		},
		{
			key   : 'paymentType',
			label : 'Payment Mode',
		},
		{
			key   : 'dot',
			label : '',
			func  : 'renderDots',
		},
	],
};

export default CONTROLS;
