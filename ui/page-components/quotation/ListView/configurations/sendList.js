function sendListConfig({ created, setCreated, expiry, setExpiry, amount, setAmount }) {
	const sendConfig = [
		{
			name      : 'Quotation No.',
			key       : 'quotationNo',
			width     : '150px',
			className : 'hyperLink',
		},
		{
			name  : 'Buyer',
			key   : 'buyerName',
			width : '180px',

		},
		{
			name         : 'Amount',
			key          : 'totalAmount',
			renderFunc   : 'renderAmount',
			sorting      : true,
			sortVariable : amount,
			sortFn       : (v) => setAmount(v),
			sortValue    : 'AMOUNT',
			width        : '150px',

		},
		{
			name         : 'Created Date',
			key          : 'quotationDate',
			sorting      : true,
			sortVariable : created,
			sortFn       : (v) => setCreated(v),
			sortValue    : 'CREATED_AT',
			width        : '160px',

		},
		{
			name         : 'Expiry',
			key          : 'expiryDate',
			sorting      : true,
			sortVariable : expiry,
			sortFn       : (v) => setExpiry(v),
			sortValue    : 'EXPIRY',
			width        : '150px',

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
			style      : {
				cursor: 'pointer',
			},

		},
	];

	return sendConfig;
}

export default sendListConfig;
