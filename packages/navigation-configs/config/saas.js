const saas = {
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
	'/saas/quickquotation/viewlist': {
		navigation : 'saas_planning-quotation',
		isMainBav  : true,
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
	'/saas/trade-partner': {
		navigation : 'saas_tools-trade_partner',
		isMainNav  : true,
	},
	'/saas/trade-partner/[trade_id]': {
		navigation : 'saas_tools-trade_partner',
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
		navigation : 'saas_tools-air_ocean_tracking_v2',
		isMainNav  : true,
	},

};

module.exports = saas;
