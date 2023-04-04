const saas = {
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
			module      : 'hsCode',
			feature     : 'hsCode',
		},
		{
			api         : 'get_saas_hs_code_heading',
			access_type : 'private',
			module      : 'hsCode',
			feature     : 'hsCode',
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
			module      : 'hsCode',
			feature     : 'hsCode',
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

	app_saas_load_container : [],
	saas_quick_quotation    : [
		{
			api          : 'get_recommended_spot_searches',
			access_type  : 'private',
			service_name : 'spot_search',
		},
		{
			api         : 'get_saas_quote_list',
			access_type : 'private',
		},
		{
			api         : 'get_saas_quote_summary',
			access_type : 'private',
		},
		{
			api         : 'delete_saas_quote',
			access_type : 'private',
		},
		{
			api         : 'saas_get_user_quota_usage',
			access_type : 'private',
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
	app_saas_import_export_doc: [
		{
			api          : 'saas_get_user_quota_usage',
			access_type  : 'private',
			service_name : 'saas_subscriptions_v2',
		},
		{
			api          : 'get_saas_bill_status',
			access_type  : 'private',
			service_name : 'saas_subscriptions_v2',
		},
		{
			api         : 'post_saas_trade_engine_document_draft',
			access_type : 'private',
			module      : 'import-export-documents',
			feature     : 'import-export-documents',
		},
		{
			api         : 'get_saas_bill_product_codes',
			access_type : 'private',
			module      : 'import-export-documents',
			feature     : 'import-export-documents',
		},
		{
			api         : 'get_saas_trade_engine_service_rates',
			access_type : 'private',
			module      : 'import-export-documents',
			feature     : 'import-export-documents',
		},
		{
			api         : 'post_saas_payment',
			access_type : 'private',
			module      : 'import-export-documents',
			feature     : 'import-export-documents',
		},
		{
			api         : 'get_saas_trade_engine',
			access_type : 'private',
			module      : 'import-export-documents',
			feature     : 'import-export-documents',
		},
		{
			api         : 'post_saas_trade_engine',
			access_type : 'private',
			module      : 'import-export-documents',
			feature     : 'import-export-documents',
		},
		{
			api         : 'get_saas_trade_engine_verify_six_digit',
			access_type : 'private',
			module      : 'import-export-documents',
			feature     : 'import-export-documents',
		},
		{
			api         : 'post_saas_trade_engine_hs_engine',
			access_type : 'private',
			module      : 'import-export-documents',
			feature     : 'import-export-documents',
		},
		{
			api         : 'get_saas_trade_engine_pdf',
			access_type : 'private',
			module      : 'import-export-documents',
			feature     : 'import-export-documents',
		},
	],
};
export default saas;
