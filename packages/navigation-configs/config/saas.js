const saas = {
	'/saas/subscriptions': {
		navigation : 'saas_subscription',
		isMainNav  : true,
	},
	'/saas/subscriptions/plans': {
		navigation: 'saas_subscription',
	},
	'/saas/subscriptions/checkout': {
		navigation: 'saas_subscription',
	},
	'/saas/subscriptions/confirmation': {
		navigation: 'saas_subscription',
	},
	'/saas/cogo-subscriptions/manage-subscription': {
		navigation : 'saas_cogo_subscription-manage',
		isMainNav  : true,
	},
	'/saas/cogo-subscriptions/checkout': {
		navigation : 'saas_cogo_subscription-manage',
		isMainNav  : true,
	},
	'/saas/cogo-subscriptions/balance-history': {
		navigation: 'saas_cogo_subscription-manage',
	},
	'/saas/premium-services/duties-taxes-calculator': {
		navigation : 'saas_premium_services-duties_and_taxes',
		isMainNav  : true,
	},
	'/saas/premium-services/trader-eligibility-check': {
		navigation : 'saas_premium_services-trader_eligibility_check',
		isMainNav  : true,
	},
	'/saas/premium-services/trader-eligibility-check/result': {
		navigation: 'saas_premium_services-trader_eligibility_check',
	},
	'/saas/hs-classification': {
		navigation: 'saas_tools-hs_code_classification',
	},
	'/saas/freight-rate-trend': {
		navigation : 'saas_tools-freight_rate_trend',
		isMainNav  : true,
	},
	'/saas/freight-rate-trend/[trend_id]': {
		navigation : 'saas_tools-freight_rate_trend',
		isMainNav  : true,
	},
	'/saas/air-schedules': {
		navigation: 'saas_schedules-air_schedules',
	},
	'/saas/ocean-schedules': {
		navigation: 'saas_tools-ocean_schedules',
	},

	'/saas/quickquotation/createquotation': {
		navigation : 'saas_planning-quotation',
		isMainBav  : true,
	},
	'/saas/quickquotation/viewlist': {
		navigation : 'saas_planning-quotation',
		isMainNav  : true,
	},
	'/saas/quickquotation/editquotation/[id]': {
		navigation : 'saas_planning-quotation',
		isMainNav  : true,
	},
	'/saas/quickquotation/viewquotation/[id]': {
		navigation : 'saas_planning-quotation',
		isMainNav  : true,
	},

	'/saas/trade-partner': {
		navigation : 'saas_planning-trade_partner',
		isMainNav  : true,
	},
	'/saas/trade-partner/[trade_id]': {
		navigation : 'saas_planning-trade_partner',
		isMainNav  : true,
	},
	'/saas/trade-partner/archived': {
		navigation : 'saas_planning-trade_partner',
		isMainNav  : true,
	},
	'/saas/premium-services/import-export-doc': {
		navigation : 'saas_premium_services-import_export_docs',
		isMainNav  : true,
	},
	'/saas/premium-services/import-export-doc/[trade_engine_id]': {
		navigation : 'saas_premium_services-import_export_docs',
		isMainNav  : true,
	},
	'/saas/premium-services/import-export-doc/[trade_engine_id]/result': {
		navigation : 'saas_premium_services-import_export_docs',
		isMainNav  : true,
	},
	'/saas/air-tracking': {
		navigation : 'saas_tools-air_tracking',
		isMainNav  : true,
	},
	'/saas/air-tracking/[tracker_id]': {
		navigation : 'saas_tools-air_tracking',
		isMainNav  : true,
	},
	'/saas/ocean-tracking': {
		navigation : 'saas_tools-ocean_tracking',
		isMainNav  : true,
	},
	'/saas/ocean-tracking/archive': {
		navigation : 'saas_tools-ocean_tracking',
		isMainNav  : true,
	},
	'/saas/ocean-tracking/[tracker_id]': {
		navigation : 'saas_tools-ocean_tracking',
		isMainNav  : true,
	},
	'/saas/dsr': {
		navigation: 'saas_tracking',
	},
	'/saas/premium-services/import-export-controls': {
		navigation : 'saas_premium_services-import_export_controls',
		isMainNav  : true,
	},
	'/saas/premium-services/import-export-controls/[trade_engine_id]': {
		navigation : 'saas_premium_services-import_export_controls',
		isMainNav  : true,
	},
	'/saas/premium-services/import-export-controls/[trade_engine_id]/result': {
		navigation : 'saas_premium_services-import_export_controls',
		isMainNav  : true,
	},
	'/saas/insurance/[type]': {
		navigation : 'saas_premium_services-cogo_insurance',
		isMainNav  : true,
	},
	'/saas/insurance': {
		navigation : 'saas_premium_services-cogo_insurance',
		isMainNav  : true,
	},
	'/saas/insurance/list': {
		navigation : 'saas_premium_services-cogo_insurance',
		isMainNav  : true,
	},
	'/saas/cogopoint': {
		navigation : 'saas_cogopoint',
		isMainNav  : true,
	},
	'/saas/cogo-store': {
		navigation : 'saas_cogostore',
		isMainNav  : true,
	},
	'/saas/cogo-store/category': {
		navigation : 'saas_cogostore',
		isMainNav  : true,
	},
	'/saas/cogo-store/category/[id]': {
		navigation : 'saas_cogostore',
		isMainNav  : true,
	},
	'/saas/cogo-store/[product_code_id]': {
		navigation : 'saas_cogostore',
		isMainNav  : true,
	},
	'/saas/cogo-store/allcategory': {
		navigation : 'saas_cogostore',
		isMainNav  : true,
	},
	'/saas/cogo-store/cart': {
		navigation : 'saas_cogostore',
		isMainNav  : true,
	},
	'/saas/cogo-store/order': {
		navigation : 'saas_cogostore',
		isMainNav  : true,
	},
	'/saas/live-vessel-tracking': {
		navigation : 'saas_tools-vessel_tracking',
		isMainNav  : true,
	},
	'/saas/order-history': {
		navigation : 'saas_premium_services-order_history',
		isMainNav  : true,
	},
	'/saas/product-inventory': {
		navigation : 'saas_planning-product_inventory',
		isMainNav  : true,
	},
	'/saas/product-inventory/archived': {
		navigation : 'saas_planning-product_inventory',
		isMainNav  : true,
	},
	'/saas/transaction-history': {
		navigation : 'saas_transaction_history',
		isMainNav  : true,
	},
	'/saas/tools/air-ocean-tracking': {
		navigation : 'saas_tools-air_ocean_tracking_v2',
		isMainNav  : true,
	},
	'/saas/tools/air-ocean-tracking/list': {
		navigation : 'saas_tools-air_ocean_tracking_v2',
		isMainNav  : true,
	},
	'/saas/tools/air-ocean-tracking/list/archive/[trackingType]': {
		navigation : 'saas_tools-air_ocean_tracking_v2',
		isMainNav  : true,
	},
	'/saas/tools/air-ocean-tracking/list/[trackingId]': {
		navigation: 'saas_tools-air_ocean_tracking_v2',
	},

};

module.exports = saas;
