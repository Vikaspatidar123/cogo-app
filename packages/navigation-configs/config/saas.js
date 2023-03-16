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
