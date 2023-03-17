const saas = {
<<<<<<< HEAD
	app_saas_tracking: [
=======
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

	app_saas_load_container : [],
	app_saas_tracking       : [
>>>>>>> cad61a42c8754eb279f725be1856a58084ef3d92
		{
			api          : 'get_saas_container_subscription',
			access_type  : 'private',
			service_name : 'saas_traceability',
		},
		{
			api          : 'create_saas_shipment_details',
			access_type  : 'private',
			service_name : 'saas_traceability',
		},
		{
			api          : 'create_update_saas_container_alert',
			access_type  : 'private',
			service_name : 'saas_traceability',
		},
		{
			api          : 'create_saas_shipment_poc',
			access_type  : 'private',
			service_name : 'saas_traceability',
		},
		{
			api          : 'get_saas_container_alert',
			access_type  : 'private',
			service_name : 'saas_traceability',
		},
		{
			api          : 'get_list_of_master_alerts',
			access_type  : 'private',
			service_name : 'saas_traceability',
		},
		{
			api          : 'list_saas_container_alerts',
			access_type  : 'private',
			service_name : 'saas_traceability',
		},
		{
			api          : 'dismiss_saas_container_alert',
			access_type  : 'private',
			service_name : 'saas_traceability',
		},
		{
			api          : 'get_saas_subscription_container_details',
			access_type  : 'private',
			service_name : 'saas_traceability',
		},
		{
			api          : 'get_saas_shipment_details',
			access_type  : 'private',
			service_name : 'saas_traceability',
		},
		{
			api          : 'callback_container_tracking',
			access_type  : 'private',
			service_name : 'saas_traceability',
		},
		{
			api          : 'get_plan',
			access_type  : 'private',
			service_name : 'saas_traceability',
		},
		{
			api          : 'create_saas_subscription_container_details',
			access_type  : 'private',
			service_name : 'saas_traceability',
		},
		{
			api          : 'list_saas_subscription_poc_details',
			access_type  : 'private',
			service_name : 'saas_traceability',
		},
		{
			api          : 'create_saas_dsr',
			access_type  : 'private',
			service_name : 'saas_traceability',
		},
		{
			api          : 'update_dsr_to_subscription_mapping',
			access_type  : 'private',
			service_name : 'saas_traceability',
		},
		{
			api          : 'list_saas_container_subscriptions',
			access_type  : 'private',
			service_name : 'saas_traceability',
		},
		{
			api          : 'update_saas_dsr',
			access_type  : 'private',
			service_name : 'saas_traceability',
		},
		{
			api          : 'send_dsr_mail',
			access_type  : 'private',
			service_name : 'saas_traceability',
		},
		{
			api          : 'saas_get_user_quota_usage',
			access_type  : 'private',
			service_name : 'saas_subscriptions_v2',
		},
		{
			api          : 'get_shipping_line_for_container_no',
			access_type  : 'private',
			service_name : 'saas_traceability',
		},
		{
			api          : 'get_saas_container_shipping_lines',
			access_type  : 'private',
			service_name : 'saas_traceability',
		},
		{
			api          : 'create_saas_container_subscription',
			access_type  : 'private',
			service_name : 'saas_traceability',
		},
		{
			api          : 'deactivate_saas_container_subscription',
			access_type  : 'private',
			service_name : 'saas_traceability',
		},
		{
			api          : 'create_saas_container_subscription_share',
			access_type  : 'private',
			service_name : 'saas_traceability',
		},
		{
			api          : 'create_saas_subscription_poc',
			access_type  : 'private',
			service_name : 'saas_traceability',
		},
		{
			api          : 'list_saas_store_quota',
			access_type  : 'private',
			service_name : 'saas_traceability',
		},
		{
			api          : 'update_saas_store_quota',
			access_type  : 'private',
			service_name : 'saas_traceability',
		},
		{
			api          : 'create_saas_container_alert',
			access_type  : 'private',
			service_name : 'saas_traceability',
		},
		{
			api          : 'update_saas_container_alert',
			access_type  : 'private',
			service_name : 'saas_traceability',
		},
		{
			api          : 'saas_get_product_family',
			access_type  : 'private',
			service_name : 'saas_traceability',
		},
		{
			api          : 'saas_get_checkout',
			access_type  : 'private',
			service_name : 'saas_traceability',
		},
		{
			api          : 'saas_create_subscription_checkout',
			access_type  : 'private',
			service_name : 'saas_traceability',
		},
		{
			api          : 'saas_update_checkout',
			access_type  : 'private',
			service_name : 'saas_traceability',
		},
		{
			api          : 'saas_create_subscription',
			access_type  : 'private',
			service_name : 'saas_traceability',
		},
		{
			api          : 'saas_subscription_callback',
			access_type  : 'private',
			service_name : 'saas_traceability',
		},
		{
			api          : 'saas_get_dashboard',
			access_type  : 'private',
			service_name : 'saas_traceability',
		},
		{
			api          : 'saas_get_subscription_status',
			access_type  : 'private',
			service_name : 'saas_traceability',
		},
		{
			api          : 'saas_create_callback_for_plan_inquiry',
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
		{
			api          : 'create_saas_container_tracker_via_csv',
			access_type  : 'private',
			service_name : 'saas_traceability',
		},
		{
			api          : 'unarchive_saas_container_subscription',
			access_type  : 'private',
			service_name : 'saas_traceability',
		},
		{
			api          : 'get_saas_container_subscription_shared_details',
			access_type  : 'private',
			service_name : 'saas_traceability',
		},
	],
	app_saas_dsr: [
		{
			api          : 'create_saas_dsr',
			access_type  : 'private',
			service_name : 'saas_traceability',
		},
		{
			api          : 'create_dsr_to_subscription_mapping',
			access_type  : 'private',
			service_name : 'saas_traceability',
		},
		{
			api          : 'create_dsr_schedule',
			access_type  : 'private',
			service_name : 'saas_traceability',
		},
		{
			api          : 'update_dsr_schedule',
			access_type  : 'private',
			service_name : 'saas_traceability',
		},
		{
			api          : 'list_saas_dsr',
			access_type  : 'private',
			service_name : 'saas_traceability',
		},
		{
			api          : 'get_dsr_to_subscription_mapping',
			access_type  : 'private',
			service_name : 'saas_traceability',
		},
		{
			api          : 'list_saas_subscription_poc_details',
			access_type  : 'private',
			service_name : 'saas_traceability',
		},
		{
			api          : 'list_saas_container_subscriptions',
			access_type  : 'private',
			service_name : 'saas_traceability',
		},
		{
			api          : 'update_saas_dsr',
			access_type  : 'private',
			service_name : 'saas_traceability',
		},
	],

};
export default saas;
