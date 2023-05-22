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
	app_saas_premium_services: [
		{
			api         : 'get_sailing_schedules',
			access_type : 'private',
			module      : 'dutiesTaxes',
			feature     : 'dutiesTaxes',
		},
		{
			api          : 'get_exchange_rate',
			access_type  : 'private',
			module       : 'dutiesTaxes',
			feature      : 'dutiesTaxes',
			service_name : 'exchange_rate',
		},
		{
			api         : 'saas_get_user_quota_usage',
			access_type : 'private',
			module      : 'dutiesTaxes',
			feature     : 'dutiesTaxes',
		},
		{
			api         : 'get_saas_bill_status',
			access_type : 'private',
			module      : 'dutiesTaxes',
			feature     : 'dutiesTaxes',
		},
		{
			api          : 'get_exchange_rate',
			access_type  : 'private',
			module       : 'dutiesTaxes',
			feature      : 'dutiesTaxes',
			service_name : 'exchange_rate',
		},
		{
			api         : 'post_saas_trade_engine_duties_draft',
			access_type : 'private',
			module      : 'dutiesTaxes',
			feature     : 'dutiesTaxes',
		},
		{
			api         : 'get_saas_trade_engine_draft',
			access_type : 'private',
			module      : 'dutiesTaxes',
			feature     : 'dutiesTaxes',
		},
		{
			api         : 'saas_get_user_quota_usage',
			access_type : 'private',
			module      : 'dutiesTaxes',
			feature     : 'dutiesTaxes',
		},
		{
			api         : 'post_saas_payment',
			access_type : 'private',
			module      : 'dutiesTaxes',
			feature     : 'dutiesTaxes',
		},
		{
			api         : 'get_saas_trade_engine',
			access_type : 'private',
			module      : 'dutiesTaxes',
			feature     : 'dutiesTaxes',
		},
		{
			api         : 'post_saas_trade_engine',
			access_type : 'private',
			module      : 'dutiesTaxes',
			feature     : 'dutiesTaxes',
		},
		{
			api         : 'post_saas_trade_engine_hs_engine',
			access_type : 'private',
			module      : 'dutiesTaxes',
			feature     : 'dutiesTaxes',
		},
		{
			api         : 'get_saas_hs_code_section',
			access_type : 'private',
			module      : 'dutiesTaxes',
			feature     : 'dutiesTaxes',
		},
		{
			api         : 'get_saas_hs_code_heading',
			access_type : 'private',
			module      : 'dutiesTaxes',
			feature     : 'dutiesTaxes',
		},
		{
			api         : 'get_saas_hs_code',
			access_type : 'private',
			module      : 'dutiesTaxes',
			feature     : 'dutiesTaxes',
		},
		{
			api         : 'get_saas_product_category_list',
			access_type : 'private',
			module      : 'dutiesTaxes',
			feature     : 'dutiesTaxes',
		},
		{
			api         : 'get_saas_product_list',
			access_type : 'private',
			module      : 'dutiesTaxes',
			feature     : 'dutiesTaxes',
		},
		{
			api         : 'get_saas_hs_code_countries',
			access_type : 'private',
			module      : 'dutiesTaxes',
			feature     : 'dutiesTaxes',
		},
		{
			api          : 'get_spot_search',
			access_type  : 'private',
			module       : 'dutiesTaxes',
			feature      : 'dutiesTaxes',
			service_name : 'spot_search',
		},
		{
			api          : 'create_spot_search',
			access_type  : 'private',
			module       : 'dutiesTaxes',
			feature      : 'dutiesTaxes',
			service_name : 'spot_search',
		},
		{
			api         : 'get_saas_trade_engine_service_rates',
			access_type : 'private',
			module      : 'dutiesTaxes',
			feature     : 'dutiesTaxes',
		},
		{
			api         : 'get_saas_trade_engine_verify_six_digit',
			access_type : 'private',
			module      : 'dutiesTaxes',
			feature     : 'dutiesTaxes',
		},
		{
			api         : 'get_saas_hs_code_search',
			access_type : 'private',
			module      : 'dutiesTaxes',
			feature     : 'dutiesTaxes',
		},
		{
			api         : 'get_saas_bill_product_codes',
			access_type : 'private',
			module      : 'dutiesTaxes',
			feature     : 'dutiesTaxes',
		},
	],

	app_saas_hs_code_list: [
		{
			api         : 'get_saas_hs_code',
			access_type : 'private',
			module      : 'hsCode',
			feature     : 'hsCode',
		},
		{
			api         : 'get_saas_hs_code_section',
			access_type : 'private',
			module      : 'dutiesTaxes',
			feature     : 'dutiesTaxes',
		},
		{
			api         : 'get_saas_hs_code_heading',
			access_type : 'private',
			module      : 'dutiesTaxes',
			feature     : 'dutiesTaxes',
		},
		{
			api         : 'get_saas_hs_code',
			access_type : 'private',
			module      : 'dutiesTaxes',
			feature     : 'dutiesTaxes',
		},
		{
			api         : 'get_saas_product_category_list',
			access_type : 'private',
			module      : 'dutiesTaxes',
			feature     : 'dutiesTaxes',
		},
		{
			api         : 'get_saas_product_list',
			access_type : 'private',
			module      : 'dutiesTaxes',
			feature     : 'dutiesTaxes',
		},
		{
			api         : 'get_saas_hs_code_countries',
			access_type : 'private',
			module      : 'dutiesTaxes',
			feature     : 'dutiesTaxes',
		},
		{
			api         : 'get_spot_search',
			access_type : 'private',
			module      : 'dutiesTaxes',
			feature     : 'dutiesTaxes',
		},
		{
			api         : 'create_spot_search',
			access_type : 'private',
			module      : 'dutiesTaxes',
			feature     : 'dutiesTaxes',
		},
		{
			api         : 'get_saas_trade_engine_service_rates',
			access_type : 'private',
			module      : 'dutiesTaxes',
			feature     : 'dutiesTaxes',
		},
		{
			api         : 'get_saas_trade_engine_verify_six_digit',
			access_type : 'private',
			module      : 'dutiesTaxes',
			feature     : 'dutiesTaxes',

		},
		{
			api         : 'get_saas_hs_code_favourites',
			access_type : 'private',
			module      : 'hsCode',
			feature     : 'hsCode',
		},
		{
			api         : 'get_saas_hs_code_search',
			access_type : 'private',
			module      : 'dutiesTaxes',
			feature     : 'dutiesTaxes',
		},
		{
			api         : 'get_saas_bill_product_codes',
			access_type : 'private',
			module      : 'dutiesTaxes',
			feature     : 'dutiesTaxes',

		},
		{
			api         : 'post_saas_hs_code_favourites',
			access_type : 'private',
			module      : 'hsCode',
			feature     : 'hsCode',
		},
		{
			api         : 'delete_saas_hs_code_favourites',
			access_type : 'private',
			module      : 'hsCode',
			feature     : 'hsCode',
		},
		{
			api         : 'post_saas_transaction_transaction_engine',
			access_type : 'private',
			module      : 'hsCode',
			feature     : 'hsCode',
		},
		{
			api         : 'get_saas_hs_code_countries',
			access_type : 'private',
			module      : 'hsCode',
			feature     : 'hsCode',
		},
		{
			api         : 'get_saas_product_category',
			access_type : 'private',
			module      : 'hsCode',
			feature     : 'hsCode',
		},
		{
			api         : 'post_saas_product',
			access_type : 'private',
			module      : 'hsCode',
			feature     : 'hsCode',
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
