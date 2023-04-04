const saas = {
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
	'/saas/quickquotation/viewlist': {
		navigation : 'saas_planning-quotation',
		isMainBav  : true,
	},
	'/saas/quickquotation/createquotation': {
		navigation : 'saas_planning-quotation',
		isMainBav  : true,
	},
	'/saas/trade-partner': {
		navigation : 'saas_tools-trade_partner',
		isMainNav  : true,
	},
	'/saas/trade-partner/[trade_id]': {
		navigation : 'saas_tools-trade_partner',
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

};

module.exports = saas;
