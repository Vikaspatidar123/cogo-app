const getListConfig = ({ t }) => [
	{
		key   : 'transactionNo',
		label : t('transactionHistory:list_label_transaction_no'),
	},
	{
		key   : 'billType',
		label : t('transactionHistory:list_label_bill_type'),
		func  : 'renderFormat',
	},
	{
		key     : 'billDate',
		label   : t('transactionHistory:list_label_bill_date'),
		func    : 'renderDate',
		sorting : true,
	},
	{
		key   : 'billAmount',
		label : t('transactionHistory:list_label_amount'),
		func  : 'renderAmount',
	},
	{
		key   : 'billStatus',
		label : t('transactionHistory:list_label_status'),
		func  : 'renderStatus',
	},
	{
		key   : 'mode',
		label : t('transactionHistory:list_label_mode'),
	},
	{
		key   : '',
		label : '',
		func  : 'renderService',
	},
];

export default getListConfig;
