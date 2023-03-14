const TRADEPARTNERLIST = {
	fields: [
		{
			key   : 'displayName',
			label : 'Buyer',
			span  : 2,
		},
		{
			key   : 'totalQuotes',
			label : 'Total Quotation',
			span  : 2,
		},

		{
			key   : 'expiredQuotes',
			label : 'Expired Quotation',
			span  : 2,
		},
		{
			key     : 'totalAmount',
			label   : 'Total Amount',
			span    : 2,
			func    : 'renderAmount',
			sorting : true,
		},
		{
			key   : 'expiredAmount',
			label : 'Expired Amount',
			span  : 1,
		},
		{
			key   : 'dot',
			label : '',
			span  : 1,
			func  : 'renderDots',
		},
	],
};

export default TRADEPARTNERLIST;
