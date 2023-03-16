const saas = {
	app_saas_trader_eligibility_check: [
		{
			api         : 'saas_get_user_quota_usage',
			access_type : 'private',
		},
		{
			api         : 'get_saas_bill_status',
			access_type : 'private',
			module      : 'trader-eligibility-check',
			feature     : 'trader-eligibility-check',
		},
		{
			api         : 'get_saas_trade_engine_service_rates',
			access_type : 'private',
			module      : 'trader-eligibility-check',
			feature     : 'trader-eligibility-check',
		},
		{
			api          : 'list_locations',
			access_type  : 'private',
			service_name : 'location',
		},
		{
			api         : 'get_saas_trade_engine',
			access_type : 'private',
			module      : 'trader-eligibility-check',
			feature     : 'trader-eligibility-check',
		},
		{
			api         : 'post_saas_payment',
			access_type : 'private',
			module      : 'trader-eligibility-check',
			feature     : 'trader-eligibility-check',
		},
		{
			api         : 'post_saas_trade_engine',
			access_type : 'private',
			module      : 'trader-eligibility-check',
			feature     : 'trader-eligibility-check',
		},
		{
			api         : 'post_saas_trade_engine_screening_draft',
			access_type : 'private',
			module      : 'trader-eligibility-check',
			feature     : 'trader-eligibility-check',
		},
		{
			api         : 'get_saas_bill_product_codes',
			access_type : 'private',
			module      : 'trader-eligibility-check',
			feature     : 'trader-eligibility-check',
		},
	],
	app_saas_freight_rate_trend: [
		{
			api          : 'get_freight_trend_subscription',
			access_type  : 'private',
			service_name : 'freight_trend',
		},
		{
			api          : 'list_freight_trend_subscriptions',
			access_type  : 'private',
			service_name : 'freight_trend',
		},
		{
			api          : 'list_freight_trend_rates',
			access_type  : 'private',
			service_name : 'freight_trend',
		},
		{
			api          : 'create_freight_trend_rate',
			access_type  : 'private',
			service_name : 'freight_trend',
		},
		{
			api          : 'create_freight_trend_subscription',
			access_type  : 'private',
			service_name : 'freight_trend',
		},
		{
			api          : 'list_saas_store_quota',
			access_type  : 'private',
			service_name : 'saas_traceability',
		},
	],

	app_saas_transaction_history: [
		{
			api         : 'get_saas_payment_details',
			access_type : 'private',
			module      : 'transactionHistory',
			feature     : 'transactionHistory',
		},
		{
			api         : 'get_saas_payment_history',
			access_type : 'private',
			module      : 'transactionHistory',
			feature     : 'transactionHistory',
		},
		{
			api         : 'get_saas_trade_engine',
			access_type : 'private',
			module      : 'transactionHistory',
			feature     : 'transactionHistory',
		},
	],

	app_saas_order_history: [
		{
			api          : 'get_saas_trade_engine_order_history',
			access_type  : 'private',
			service_name : 'order_history',
		},
		{
			api          : 'get_saas_trade_engine',
			access_type  : 'private',
			service_name : 'order_history',
		},
	],

	app_saas_load_container: [],

};
export default saas;
