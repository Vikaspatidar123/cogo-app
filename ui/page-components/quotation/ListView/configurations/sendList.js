const sendListConfig = [
	{
		name  : 'Quotation No.',
		key   : 'quotationNo',
		width : '150px',
	},
	{
		name  : 'Buyer',
		key   : 'buyerName',
		width : '180px',

	},
	{
		name       : 'Amount',
		key        : 'totalAmount',
		renderFunc : 'renderAmount',
		sorting    : true,
		width      : '150px',

	},
	{
		name    : 'Created Date',
		key     : 'quotationDate',
		sorting : true,
		width   : '160px',

	},
	{
		name  : 'Expiry',
		key   : 'expiryDate',
		width : '150px',

	},
	{
		name       : 'Status',
		key        : 'documentStatus',
		renderFunc : 'renderStatus',
		width      : '80px',

	},
	{
		name       : '',
		key        : 'tooltipOption',
		renderFunc : 'renderToolTip',
		width      : '30px',

	},
];

export default sendListConfig;
