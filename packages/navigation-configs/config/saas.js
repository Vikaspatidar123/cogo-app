const saas = {
	'/saas/ocean-tracking': {
		navigation : 'saas_tools-ocean_tracking',
		isMainNav  : true,
	},
	'/saas/ocean-tracking/archive': {
		navigation : 'saas_tools-ocean_tracking',
		isMainNav  : true,
	},
	'/saas/tracking/[tracker_id]': {
		navigation : 'saas_tools-ocean_tracking',
		isMainNav  : true,
	},
	'/saas/dsr': {
		navigation: 'saas_tracking',
	},

	'/saas/freight-rate-trend': {
		navigation : 'saas_tools-freight_rate_trend',
		isMainNav  : true,
	},
	'/saas/freight-rate-trend/[trend_id]': {
		navigation : 'saas_tools-freight_rate_trend',
		isMainNav  : true,
	},
	'/saas/trade-partner': {
		navigation : 'saas_tools-trade_partner',
		isMainNav  : true,
	},
	'/saas/trade-partner/[trade_id]': {
		navigation : 'saas_tools-trade_partner',
		isMainNav  : true,
	},
};

module.exports = saas;
