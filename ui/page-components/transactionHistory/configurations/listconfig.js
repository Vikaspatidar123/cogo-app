const listConfig = {
	fields: [
		{
			key   : 'transactionNo',
			label : 'Transaction No',
		},
		{
			key   : 'billType',
			label : 'Bill Type',
			func  : 'renderFormat',
		},
		{
			key     : 'billDate',
			label   : 'Bill Date',
			func    : 'renderDate',
			sorting : true,
		},
		{
			key   : 'billAmount',
			label : 'Amount',
			func  : 'renderAmount',
		},
		{
			key   : 'billStatus',
			label : 'Status',
			func  : 'renderStatus',
		},
		{
			key   : 'mode',
			label : 'Payment Mode',
		},
		{
			key   : '',
			label : '',
			func  : 'renderService',
		},
	],
};

export default listConfig;
