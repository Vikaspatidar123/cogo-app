const listConfig = {
	fields: [
		{
			key   : 'transactionNo',
			label : 'Transaction No',
			span  : 2,
		},
		{
			key   : 'billType',
			label : 'Bill Type',
			span  : 2,
			func  : 'renderFormat',
		},
		{
			key     : 'billDate',
			label   : 'Bill Date',
			span    : 2,
			func    : 'renderDate',
			sorting : true,
		},
		{
			key   : 'billAmount',
			label : 'Amount',
			span  : 1.6,
			func  : 'renderAmount',
		},
		{
			key   : 'billStatus',
			label : 'Status',
			span  : 1.8,
			func  : 'renderStatus',
		},
		{
			key   : 'mode',
			label : 'Payment Mode',
			span  : 1.5,
		},
		{
			key   : '',
			label : '',
			span  : 0.9,
			func  : 'renderService',
		},
	],
};

export default listConfig;
