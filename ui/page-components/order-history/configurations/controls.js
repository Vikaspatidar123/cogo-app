const getConfig = ({ t }) => [
	{
		key   : 'orderNumber',
		label : t('orderHistory:list_title_order_no'),
		width : '20%',
		func  : 'renderHyperLink',
	},
	{
		key   : 'requestType',
		label : t('orderHistory:list_title_service_type'),
		width : '15%',
	},
	{
		key        : 'orderDate',
		label      : t('orderHistory:list_title_order_date'),
		sorting    : true,
		func       : 'renderDate',
		sortingKey : 'CREATED_AT',
		width      : '15%',
	},
	{
		key   : 'status',
		label : t('orderHistory:list_title_status'),
		func  : 'renderStatus',
		width : '20%',
	},
	{
		key   : 'paymentType',
		label : t('orderHistory:list_title_pay_mode'),
		width : '15%',
	},
	{
		key   : 'csat',
		label : '',
		func  : 'renderCsat',
		width : '9%',
	},
];

export default getConfig;
