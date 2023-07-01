const PaymentColumns = [
	{
		label: ' ',
		key: 'id',
		func: 'handleSelect',
		span: 0.6,
	},
	{
		label: 'Payment Number',
		key: 'payment_num',
		func: 'handleText',
		span: 2.3,
	},
	{
		label: 'Payment Amount',
		key: 'account_util_amt_led',
		func: 'handlePrice',
		currencyKey: 'led_currency',
		sort: true,
		span: 2.3,
	},
	{
		label: 'Unused Amount',
		key: 'account_util_amt_led',
		func: 'handleUtilPrice',
		currencyKey: 'led_currency',
		amountSubtractKey: 'account_util_pay_led',
		signFlag: 'sign_flag',
		span: 2.3,
	},
	{
		label: 'Transaction Date',
		key: 'transaction_date',
		func: 'handleDate',
		formatType: 'dd MMM yyyy',
		sort: true,
		span: 2.3,
	},
	{
		label: 'Utilization Status',
		key: 'utilization_status',
		func: 'handleStatus',
		span: 2.2,
	},
];
export default PaymentColumns;
