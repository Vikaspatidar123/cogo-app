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
