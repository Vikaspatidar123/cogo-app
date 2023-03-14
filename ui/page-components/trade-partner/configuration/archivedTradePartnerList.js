const ARCHIVEDTRADEPARTNERLIST = {
	fields: [
		{
			key   : 'displayName',
			label : 'Buyer',
		},
		{
			key   : 'totalQuotes',
			label : 'Total Quotation',
		},

		{
			key   : 'expiredQuotes',
			label : 'Expired Quotation',
		},
		{
			key   : 'totalAmount',
			label : 'Total Amount',
			func  : 'renderAmount',
		},
		{
			key   : 'expiredAmount',
			label : 'Expired Amount',
		},
		{
			key   : 'dot',
			label : '',
			func  : 'renderDots',
		},
	],
};

export default ARCHIVEDTRADEPARTNERLIST;
