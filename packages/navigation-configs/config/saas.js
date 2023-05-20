const saas = {
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
	'/saas/trade-partner': {
		navigation : 'saas_tools-trade_partner',
		isMainNav  : true,
	},
	'/saas/trade-partner/[trade_id]': {
		navigation : 'saas_tools-trade_partner',
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

};

module.exports = saas;
