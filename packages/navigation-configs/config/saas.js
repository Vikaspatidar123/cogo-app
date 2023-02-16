const saas = {
	'/saas/tracking': {
		navigation: 'saas_tools-ocean_tracking',
		isMainNav: true,
	},
	'/saas/tracking/archive': {

		navigation: 'saas_tools-ocean_tracking',
	},
	'/saas/tracking/[tracker_id]': {

		navigation: 'saas_tools-ocean_tracking',
	},
	'/saas/dsr': {

		navigation: 'saas_tracking',
	},
	'/saas/air-tracking': {

		navigation: 'saas_tools-air_schedules',
		isMainNav: true,
	},
	'/saas/air-tracking/archive': {

		navigation: 'saas_tools-air_schedules',
	},
	'/saas/air-tracking/[tracker_id]': {

		navigation: 'saas_tools-air_schedules',
	},
	'/saas/schedules': {

		navigation: 'saas_tools-ocean_schedules',
		isMainNav: true,
	},
	'/saas/schedules/[schedule_id]': {

		navigation: 'saas_tools-ocean_schedules',
	},
	'/saas/air-schedules': {

		navigation: 'saas_tools-air_schedules',
		isMainNav: true,
	},
	'/saas/air-schedules/[schedule_id]': {

		navigation: 'saas_tools-air_schedules',
	},
	'/saas/subscriptions': {

		navigation: 'saas_subscription',
		isMainNav: true,
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
	'/saas/cpq': {

		navigation: 'saas_cpq',
		isMainNav: true,
	},
	'/saas/cpq/products': {

		navigation: 'saas_cpq_products',
		isMainNav: true,
	},
	'/saas/cpq/contacts': {
		navigation: 'saas_cpq_contacts',
		isMainNav: true,
	},
	'/saas/quotation/create': {

		navigation: 'saas_create_quotation',
		isMainNav: true,
	},
	'/saas/quotation/edit/[quotation_id]': {
		navigation: 'saas_edit_quotation',
		isMainNav: true,
	},
	'/saas/purchase/create': {

		navigation: 'saas_create_purchase',
		isMainNav: true,
	},
	'/saas/purchase/edit/[purchase_id]': {

		navigation: 'saas_edit_purchase',
		isMainNav: true,
	},

};

module.exports = saas;
