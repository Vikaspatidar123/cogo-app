const CONTROLS = {
	fields: [
		{
			accessor : 'orderNumber',
			Header   : 'Order Number',
			width    : 1.5,
		},
		{
			accessor : 'requestType',
			Header   : 'Service Type',
			width    : 2,
		},
		{
			accessor   : 'orderDate',
			Header     : 'Order Date',
			width      : 2,
			sorting    : true,
			func       : 'renderDate',
			sortingKey : 'CREATED_AT',
		},
		{
			accessor : 'status',
			Header   : 'Status',
			width    : 2,
			func     : 'renderStatus',
		},
		{
			accessor : 'paymentType',
			Header   : 'Payment Mode',
			width    : 2,
		},
		{
			accessor : 'dot',
			Header   : '',
			width    : 2,
			func     : 'renderDots',
		},
	],
};

export default CONTROLS;
