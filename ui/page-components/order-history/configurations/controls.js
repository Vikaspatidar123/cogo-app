const CONTROLS = {
	fields: [
		{
			key   : 'orderNumber',
			label : 'Order Number',
			width : '20%',
		},
		{
			key   : 'requestType',
			label : 'Service Type',
			width : '15%',
		},
		{
			key        : 'orderDate',
			label      : 'Order Date',
			sorting    : true,
			func       : 'renderDate',
			sortingKey : 'CREATED_AT',
			width      : '15%',
		},
		{
			key   : 'status',
			label : 'Status',
			func  : 'renderStatus',
			width : '20%',
		},
		{
			key   : 'paymentType',
			label : 'Payment Mode',
			width : '15%',
		},
		{
			key   : 'dot',
			label : '',
			func  : 'renderDots',
			width : '9%',
		},
	],
};

export default CONTROLS;
