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
	],

	app_saas_load_container: [],

	checkout_promotions: [
		{
			api          : 'list_checkout_applicable_promocodes',
			access_type  : 'private',
			service_name : 'checkout',
		},
		{
			api          : 'update_checkout_promotion',
			access_type  : 'private',
			service_name : 'checkout',
		},
	],
	app_saas_tracking: [
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
			service_name : 'saas_subscriptions_v2',
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

	saas_cogo_insurance: [
		{
			api          : 'create_organization_billing_address',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'post_saas_insurance',
			access_type  : 'private',
			service_name : 'insurance',
		},
		{
			api         : 'list_address_for_insurance',
			access_type : 'private',
		},
		{
			api          : 'post_saas_insurance_cancel',
			access_type  : 'private',
			service_name : 'insurance',
		},
		{
			api          : 'post_saas_insurance_claim',
			access_type  : 'private',
			service_name : 'insurance',
		},
		{
			api          : 'get_saas_insurance_draft_details',
			access_type  : 'private',
			service_name : 'insurance',
		},
		{
			api          : 'get_saas_faq',
			access_type  : 'private',
			service_name : 'insurance',
		},
		{
			api          : 'get_saas_insurance_details',
			access_type  : 'private',
			service_name : 'insurance',
		},
		{
			api          : 'get_saas_insurance_rate',
			access_type  : 'private',
			service_name : 'insurance',
		},
		{
			api          : 'get_saas_insurance_list_summary',
			access_type  : 'private',
			service_name : 'insurance',
		},
		{
			api          : 'get_saas_insurance_terms',
			access_type  : 'private',
			service_name : 'insurance',
		},
		{
			api          : 'post_saas_insurance_checkout',
			access_type  : 'private',
			service_name : 'insurance',
		},
		{
			api          : 'get_saas_insurance_list',
			access_type  : 'private',
			service_name : 'insurance',
		},
		{
			api          : 'post_saas_payment',
			access_type  : 'private',
			service_name : 'insurance',
		},
		{
			api          : 'post_saas_insurance_draft',
			access_type  : 'private',
			service_name : 'insurance',
		},
		{
			api         : 'get_saas_insurance_pdf',
			access_type : 'private',
			module      : 'insurance',
		},
	],
	saas_tools_insurance: [],

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
	saas_quick_quotation: [
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
	],
	app_documents: [
		{
			api          : 'list_organization_documents',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'create_organization_document',
			access_type  : 'private',
			service_name : 'organization',
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
			api         : 'get_saas_pdf_bill',
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
		{
			api         : 'get_saas_trade_engine_pdf',
			access_type : 'private',
			module      : 'transactionHistory',
			feature     : 'transactionHistory',
		},
	],
	app_saas_import_export_controls: [
		{
			api          : 'saas_get_user_quota_usage',
			access_type  : 'private',
			service_name : 'saas_subscriptions_v2',
		},
		{
			api          : 'list_organizations',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'create_organization_address',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'create_organization_billing_address',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api         : 'post_saas_payment_cancel_order',
			access_type : 'private',
			module      : 'import-export-controls',
			feature     : 'import-export-controls',
		},
		{
			api         : 'get_saas_bill_status',
			access_type : 'private',
			module      : 'import-export-controls',
			feature     : 'import-export-controls',
		},
		{
			api         : 'post_saas_trade_engine_controls_draft',
			access_type : 'private',
			module      : 'import-export-controls',
			feature     : 'import-export-controls',
		},
		{
			api         : 'get_saas_trade_engine_draft',
			access_type : 'private',
			module      : 'import-export-controls',
			feature     : 'import-export-controls',
		},
		{
			api         : 'get_saas_bill_product_codes',
			access_type : 'private',
			module      : 'import-export-controls',
			feature     : 'import-export-controls',
		},
		{
			api         : 'get_saas_trade_engine_service_rates',
			access_type : 'private',
			module      : 'import-export-controls',
			feature     : 'import-export-controls',
		},
		{
			api         : 'post_saas_payment',
			access_type : 'private',
			module      : 'import-export-controls',
			feature     : 'import-export-controls',
		},
		{
			api         : 'get_saas_trade_engine',
			access_type : 'private',
			module      : 'import-export-controls',
			feature     : 'import-export-controls',
		},
		{
			api         : 'post_saas_trade_engine',
			access_type : 'private',
			module      : 'import-export-controls',
			feature     : 'import-export-controls',
		},
		{
			api         : 'post_saas_trade_engine_hs_engine',
			access_type : 'private',
			module      : 'import-export-controls',
			feature     : 'import-export-controls',
		},
		{
			api         : 'get_saas_trade_engine_verify_six_digit',
			access_type : 'private',
			module      : 'import-export-controls',
			feature     : 'import-export-controls',
		},
		{
			api         : 'get_saas_product_category_list',
			access_type : 'private',
			module      : 'product-catalogue',
			feature     : 'product-catalogue',
		},
		{
			api         : 'get_saas_product_list',
			access_type : 'private',
			module      : 'product-catalogue',
			feature     : 'product-catalogue',
		},
		{
			api         : 'get_saas_hs_code_section',
			access_type : 'private',
			module      : 'product-catalogue',
			feature     : 'product-catalogue',
		},
		{
			api         : 'get_saas_hs_code_heading',
			access_type : 'private',
			module      : 'product-catalogue',
			feature     : 'product-catalogue',
		},
		{
			api         : 'get_saas_hs_code',
			access_type : 'private',
			module      : 'product-catalogue',
			feature     : 'product-catalogue',
		},
		{
			api         : 'get_saas_hs_code_search',
			access_type : 'private',
			module      : 'product-catalogue',
			feature     : 'product-catalogue',
		},
		{
			api         : 'get_saas_hs_code_countries',
			access_type : 'private',
			module      : 'product-catalogue',
			feature     : 'product-catalogue',
		},
		{
			api          : 'get_sea_route',
			access_type  : 'public',
			service_name : 'location',
		},
	],
	pay_later: [
		{
			api          : 'get_organization_credit_request',
			access_type  : 'private',
			service_name : 'credit',
		},
		{
			api          : 'create_organization_credit_request',
			access_type  : 'private',
			service_name : 'credit',
		},
		{
			api          : 'get_tax_numbers_data',
			access_type  : 'private',
			service_name : 'credit',
		},
		{
			api          : 'list_organization_users',
			access_type  : 'private',
			service_name : 'organization',
		},
		{

			api          : 'get_company_finance_data',
			access_type  : 'private',
			service_name : 'credit',
		},
		{
			api          : 'update_organization_credit_request',
			access_type  : 'private',
			service_name : 'credit',
		},
		{
			api          : 'update_organization_credit_requirement_details',
			access_type  : 'private',
			service_name : 'credit',
		},
		{
			api          : 'apply_credit_request_coupon_code',
			access_type  : 'private',
			service_name : 'credit',
		},
		{
			api         : 'list_coupons',
			access_type : 'public',
			// service_name : 'organization',
		},
		{
			api          : 'submit_credit_application',
			access_type  : 'private',
			service_name : 'credit',
		},
		{
			api          : 'update_credit_request_promotion',
			access_type  : 'private',
			service_name : 'credit',
		},
		{
			api          : 'update_organization_credit_application',
			access_type  : 'private',
			service_name : 'credit',
		},
		{
			api          : 'update_organization_credit_request_poc_details',
			access_type  : 'private',
			service_name : 'credit',
		},
		{
			api          : 'submit_credit_application_for_agreement_flow',
			access_type  : 'private',
			service_name : 'credit',
		},
	],
	app_saas_cogopoint: [
		{
			api          : 'get_organization_cogopoint_profile',
			access_type  : 'private',
			service_name : 'cogopoint',
		},
		{
			api          : 'get_cogopoint_history_detail',
			access_type  : 'private',
			service_name : 'cogopoint',
		},
		{
			api          : 'get_cogopoint_user_dashboard',
			access_type  : 'private',
			service_name : 'cogopoint',
		},
		{
			api          : 'list_user_cogopoint_histories',
			access_type  : 'private',
			service_name : 'cogopoint',
		},
	],
	app_saas_cogostore: [
		{
			api          : 'list_cogostore_voucher_brands',
			access_type  : 'private',
			service_name : 'cogopoint',
		},

		{
			api          : 'create_cogostore_cart_item',
			access_type  : 'private',
			service_name : 'cogopoint',
		},

		{
			api          : 'list_cogostore_products',
			access_type  : 'private',
			service_name : 'cogopoint',
		},

		{
			api          : 'get_cogostore_product',
			access_type  : 'private',
			service_name : 'cogopoint',
		},
		{
			api          : 'get_cogopoint_user_profile',
			access_type  : 'private',
			service_name : 'cogopoint',
		},
	],
	app_saas_product_inventory: [
		{
			api         : 'put_saas_product_archive',
			access_type : 'private',
			module      : 'product',
			feature     : 'product',
		},
		{
			api         : 'get_saas_product',
			access_type : 'private',
			module      : 'product',
			feature     : 'product',
		},
		{
			api         : 'get_saas_product_category',
			access_type : 'private',
			module      : 'product',
			feature     : 'product',
		},
		{
			api         : 'get_saas_product_top_products',
			access_type : 'private',
			module      : 'product',
			feature     : 'product',
		},
		{
			api         : 'get_saas_hs_code_section',
			access_type : 'private',
			module      : 'product',
			feature     : 'product',
		},
		{
			api         : 'get_saas_hs_code_heading',
			access_type : 'private',
			module      : 'product',
			feature     : 'product',
		},
		{
			api         : 'get_saas_hs_code',
			access_type : 'private',
			module      : 'product',
			feature     : 'product',
		},
		{
			api         : 'get_saas_product_category_list',
			access_type : 'private',
			module      : 'product',
			feature     : 'product',
		},
		{
			api         : 'get_saas_product_list',
			access_type : 'private',
			module      : 'product',
			feature     : 'product',
		},
		{
			api         : 'post_saas_product',
			access_type : 'private',
			module      : 'product',
			feature     : 'product',
		},
		{
			api         : 'get_saas_product_top_list',
			access_type : 'private',
			module      : 'product',
			feature     : 'product',
		},
		{
			api         : 'get_saas_product_total_revenue',
			access_type : 'private',
			module      : 'product',
			feature     : 'product',
		},
		{
			api         : 'put_saas_product_unarchived',
			access_type : 'private',
			module      : 'product',
			feature     : 'product',
		},
		{
			api         : 'get_saas_hs_code_countries',
			access_type : 'private',
			module      : 'product',
			feature     : 'product',
		},
		{
			api         : 'put_saas_product_unarchive',
			access_type : 'private',
			module      : 'product',
			feature     : 'product',
		},
		{
			api         : 'delete_saas_product',
			access_type : 'private',
			module      : 'product',
			feature     : 'product',
		},
		{
			api         : 'put_saas_product',
			access_type : 'private',
			module      : 'product',
			feature     : 'product',
		},
		{
			api         : 'get_saas_hs_code_search',
			access_type : 'private',
			module      : 'product',
			feature     : 'product',
		},
	],
	app_saas_order_history: [
		{
			api         : 'get_saas_trade_engine_order_history',
			access_type : 'private',
			module      : 'order-history',
			feature     : 'order-history',
		},
		{
			api         : 'get_saas_trade_engine',
			access_type : 'private',
			module      : 'order-history',
			feature     : 'order-history',
		},
	],
	app_saas_live_vessel_tracking: [
		{
			api         : 'get_saas_vessel_tracking',
			access_type : 'private',
			module      : 'live-vessel-tracking',
			feature     : 'live-vessel-tracking',
		},
	],
};
export default saas;
