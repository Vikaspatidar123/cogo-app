const getPaymentCols = ({ t }) => [
	{
		label : ' ',
		key   : 'id',
		func  : 'handleSelect',
		span  : 0.6,
	},
	{
		label : t('createTicketPublic:payment_col_1'),
		key   : 'payment_num',
		func  : 'handleText',
		span  : 2.3,
	},
	{
		label       : t('createTicketPublic:payment_col_2'),
		key         : 'account_util_amt_led',
		func        : 'handlePrice',
		currencyKey : 'led_currency',
		sort        : true,
		span        : 2.3,
	},
	{
		label             : t('createTicketPublic:payment_col_3'),
		key               : 'account_util_amt_led',
		func              : 'handleUtilPrice',
		currencyKey       : 'led_currency',
		amountSubtractKey : 'account_util_pay_led',
		signFlag          : 'sign_flag',
		span              : 2.3,
	},
	{
		label      : t('createTicketPublic:payment_col_4'),
		key        : 'transaction_date',
		func       : 'handleDate',
		formatType : 'dd MMM yyyy',
		sort       : true,
		span       : 2.3,
	},
	{
		label : t('createTicketPublic:payment_col_5'),
		key   : 'utilization_status',
		func  : 'handleStatus',
		span  : 2.2,
	},
];
export default getPaymentCols;
