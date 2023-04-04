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

	app_saas_load_container : [],
	app_saas_tracking       : [

		{
			api          : 'create_saas_shipment_details',
			access_type  : 'private',
			service_name : 'saas_traceability',
		},
		{
			api          : 'get_saas_container_alert',
			access_type  : 'private',
			service_name : 'saas_traceability',
		},
		{
			api          : 'saas_get_user_quota_usage',
			access_type  : 'private',
			service_name : 'saas_subscriptions_v2',
		},
		{
			api          : 'get_airline_from_airway_bill',
			access_type  : 'private',
			service_name : 'saas_traceability',
		},
		{
			api          : 'create_organization_billing_address',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_organization_billing_addresses',
			access_type  : 'private',
			service_name : 'organization',
		},
	],

	app_saas_map_tracking: [
		{
			api          : 'list_all_subscriptions',
			access_type  : 'public',
			service_name : 'air_tracking',
		},
		{
			api          : 'get_container_sea_route',
			access_type  : 'public',
			service_name : 'saas_traceability',
		},
	],
	app_saas_air_tracking: [
		{
			api          : 'create_saas_air_subscription',
			access_type  : 'private',
			service_name : 'air_tracking',
		},
		{
			api          : 'get_saas_air_subscription',
			access_type  : 'private',
			service_name : 'air_tracking',
		},
		{
			api          : 'create_saas_air_shipment_details',
			access_type  : 'private',
			service_name : 'air_tracking',
		},
		{
			api          : 'create_saas_air_shipment_poc',
			access_type  : 'private',
			service_name : 'air_tracking',
		},
		{
			api          : 'create_saas_air_subscription_poc',
			access_type  : 'private',
			service_name : 'air_tracking',
		},
		{
			api          : 'create_saas_air_subscription_share',
			access_type  : 'private',
			service_name : 'air_tracking',
		},
		{
			api          : 'create_saas_air_timeline',
			access_type  : 'private',
			service_name : 'air_tracking',
		},
		{
			api          : 'deactivate_saas_air_subscription',
			access_type  : 'private',
			service_name : 'air_tracking',
		},
		{
			api          : 'get_saas_air_shipment_details',
			access_type  : 'private',
			service_name : 'air_tracking',
		},
		{
			api          : 'get_saas_air_subscription_shared_details',
			access_type  : 'private',
			service_name : 'air_tracking',
		},
		{
			api          : 'get_saas_air_timeline',
			access_type  : 'private',
			service_name : 'air_tracking',
		},
		{
			api          : 'list_saas_air_subscriptions',
			access_type  : 'private',
			service_name : 'air_tracking',
		},
		{
			api          : 'list_saas_air_subscription_poc_details',
			access_type  : 'private',
			service_name : 'air_tracking',
		},
		{
			api          : 'get_airline_from_airway_bill',
			access_type  : 'private',
			service_name : 'operator',
		},
		{
			api          : 'create_update_saas_air_alert',
			access_type  : 'private',
			service_name : 'air_tracking',
		},
		{
			api          : 'unarchive_saas_air_subscription',
			access_type  : 'private',
			service_name : 'air_tracking',
		},
		{
			api          : 'saas_get_user_quota_usage',
			access_type  : 'private',
			service_name : 'saas_subscriptions_v2',
		},
		{
			api          : 'create_saas_air_tracker_via_csv',
			access_type  : 'private',
			service_name : 'air_tracking',
		},
		{
			api          : 'list_saas_store_quota',
			access_type  : 'private',
			service_name : 'saas_traceability',
		},
	],

};
export default saas;
