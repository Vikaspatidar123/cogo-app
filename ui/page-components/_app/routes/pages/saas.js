const { all } = require('../config/accountTypeConfig');

// prettier-ignore

const saas = {
	'/saas/tracking': {
		account_types : [all.prefix],
		navigation    : 'saas_tools-ocean_tracking',
		isMainNav     : true,
	},
	'/saas/tracking/archive': {
		account_types : [all.prefix],
		navigation    : 'saas_tools-ocean_tracking',
	},
	'/saas/tracking/[tracker_id]': {
		account_types : [all.prefix],
		navigation    : 'saas_tools-ocean_tracking',
	},
	'/saas/dsr': {
		account_types : [all.prefix],
		navigation    : 'saas_tracking',
	},
	'/saas/air-tracking': {
		account_types : [all.prefix],
		navigation    : 'saas_tools-air_schedules',
		isMainNav     : true,
	},
	'/saas/air-tracking/archive': {
		account_types : [all.prefix],
		navigation    : 'saas_tools-air_schedules',
	},
	'/saas/air-tracking/[tracker_id]': {
		account_types : [all.prefix],
		navigation    : 'saas_tools-air_schedules',
	},
	'/saas/schedules': {
		account_types : [all.prefix],
		navigation    : 'saas_tools-ocean_schedules',
		isMainNav     : true,
	},
	'/saas/schedules/[schedule_id]': {
		account_types : [all.prefix],
		navigation    : 'saas_tools-ocean_schedules',
	},
	'/saas/air-schedules': {
		account_types : [all.prefix],
		navigation    : 'saas_tools-air_schedules',
		isMainNav     : true,
	},
	'/saas/air-schedules/[schedule_id]': {
		account_types : [all.prefix],
		navigation    : 'saas_tools-air_schedules',
	},
	'/saas/subscriptions': {
		account_types : [all.prefix],
		navigation    : 'saas_subscription',
		isMainNav     : true,
	},
	'/saas/subscriptions/plans': {
		account_types : [all.prefix],
		navigation    : 'saas_subscription',
	},
	'/saas/subscriptions/checkout': {
		account_types : [all.prefix],
		navigation    : 'saas_subscription',
	},
	'/saas/subscriptions/confirmation': {
		account_types : [all.prefix],
		navigation    : 'saas_subscription',
	},
	'/saas/cpq': {
		account_types : [all.prefix],
		navigation    : 'saas_cpq',
		isMainNav     : true,
	},
	'/saas/cpq/products': {
		account_types : [all.prefix],
		navigation    : 'saas_cpq_products',
		isMainNav     : true,
	},
	'/saas/cpq/contacts': {
		account_types : [all.prefix],
		navigation    : 'saas_cpq_contacts',
		isMainNav     : true,
	},
	'/saas/quotation/create': {
		account_types : [all.prefix],
		navigation    : 'saas_create_quotation',
		isMainNav     : true,
	},
	'/saas/quotation/edit/[quotation_id]': {
		account_types : [all.prefix],
		navigation    : 'saas_edit_quotation',
		isMainNav     : true,
	},
	'/saas/purchase/create': {
		account_types : [all.prefix],
		navigation    : 'saas_create_purchase',
		isMainNav     : true,
	},
	'/saas/purchase/edit/[purchase_id]': {
		account_types : [all.prefix],
		navigation    : 'saas_edit_purchase',
		isMainNav     : true,
	},
	'/saas/invoice/create': {
		account_types : [all.prefix],
		navigation    : 'saas_create_invoice',
		isMainNav     : true,
	},
	'/saas/invoice/edit/[invoice_id]': {
		account_types : [all.prefix],
		navigation    : 'saas_edit_invoice',
		isMainNav     : true,
	},
	'/saas/quotation/list': {
		account_types : [all.prefix],
		navigation    : 'saas_list_quotation',
		isMainNav     : true,
	},
	'/saas/purchase/list': {
		account_types : [all.prefix],
		navigation    : 'saas_list_purchase',
		isMainNav     : true,
	},
	'/saas/invoice/list': {
		account_types : [all.prefix],
		navigation    : 'saas_list_invoice',
		isMainNav     : true,
	},
	'/saas/quotation/view/[quotation_id]': {
		account_types : [all.prefix],
		navigation    : 'saas_view_quotation',
		isMainNav     : true,
	},
	'/saas/purchase/view/[purchase_id]': {
		account_types : [all.prefix],
		navigation    : 'saas_view_purchase',
		isMainNav     : true,
	},
	'/saas/invoice/view/[invoice_id]': {
		account_types : [all.prefix],
		navigation    : 'saas_view_invoice',
		isMainNav     : true,
	},
	'/saas/quotation/preview/[quotation_id]': {
		account_types : [all.prefix],
		navigation    : 'saas_preview_quotation',
		isMainNav     : true,
	},
	'/saas/purchase/preview/[purchase_id]': {
		account_types : [all.prefix],
		navigation    : 'saas_preview_purchase',
		isMainNav     : true,
	},
	'/saas/invoice/preview/[invoice_id]': {
		account_types : [all.prefix],
		navigation    : 'saas_preview_invoice',
		isMainNav     : true,
	},
	'/saas/map-dashboard': {
		account_types : [all.prefix],
		navigation    : 'saas_map',
		isMainNav     : true,
	},
	'/saas/schedule-map-dashboard': {
		account_types : [all.prefix],
		navigation    : 'saas_schedule_map',
		isMainNav     : true,
	},
	'/saas/freight-rate-trend': {
		account_types : [all.prefix],
		navigation    : 'saas_freight_rate_trend',
		isMainNav     : true,
	},
	'/saas/freight-rate-trend/[trend_id]': {
		account_types : [all.prefix],
		navigation    : 'saas_freight_rate_trend',
	},
	'/saas/notifications': {
		account_types : [all.prefix],
		navigation    : 'saas_notifications',
	},
	'/saas/cpq-dashboard': {
		account_types : [all.prefix],
		navigation    : 'saas_cpq_dashboard',
		isMainNav     : true,
	},
	'/saas/hs-classification': {
		account_types: [all.prefix],
		navigation : 'saas_tools-hs_code_classification',
		isMainNav  : true,
	},
	'/saas/cogopoint': {
		account_types: [all.prefix],
		navigation : 'saas_cogopoint',
		isMainNav  : true,
	},
	'/saas/cogopoint/how-to-earn': {
		account_types: [all.prefix],
		navigation : 'saas_cogopoint',
		isMainNav  : true,
	},
	'/saas/quickquotation/viewlist' : {
		account_types: [all.prefix],
		navigation : 'saas_planning-quotation',
		isMainNav  : true,
	},
	'/saas/quickquotation/createquotation' : {
		account_types: [all.prefix],
		navigation : 'saas_planning-quotation',
		isMainNav  : true,
	},
	'/saas/quickquotation/editquotation/[id]' : {
		account_types: [all.prefix],
		navigation : 'saas_planning-quotation',
		isMainNav  : true,
	},
	'/saas/quickquotation/viewquotation/[id]' : {
		account_types: [all.prefix],
		navigation : 'saas_planning-quotation',
		isMainNav  : true,
	},
	'/saas/cogo-subscriptions' : {
		account_types: [all.prefix],
		navigation : 'saas_cogo_subscriptions',
		isMainNav  : true,
	},
	'/saas/cogo-subscriptions/manage-subscription' : {
		account_types: [all.prefix],
		navigation : 'saas_cogo_subscription-manage',
		isMainNav  : true,
	},
	'/saas/cogo-subscriptions/balance-history':{
		account_types: [all.prefix],
		navigation : 'saas_cogo_subscription-balance_history',
		isMainNav  : true,
	},
	'/saas/cogo-subscriptions/checkout':{
		account_types: [all.prefix],
		navigation : 'saas_cogo_subscription-manage',
		isMainNav  : true,
	},
	'/saas/insurance' : {
		account_types: [all.prefix],
		navigation : 'saas_quick_insurance',
		isMainNav  : true,
	},
	'/saas/insurance/[type]' : {
		account_types: [all.prefix],
		navigation : 'saas_quick_insurance',
		isMainNav  : true,
	},
	'/saas/insurance/list' : {
		account_types: [all.prefix],
		navigation : 'saas_quick_insurance',
		isMainNav  : true,
	},
	'/saas/transaction-history': {
		account_types: [all.prefix],
		navigation : 'saas_finance-transaction_history',
		isMainNav  : true,
	},
	'/saas/trade-partner':{
		account_types:[all.prefix],
		navigation:'saas_planning-trade_partner',
		isMainNav:true,
	},
	'/saas/trade-partner/archived':{
		account_types:[all.prefix],
		navigation:'saas_trade_partner',
		isMainNav:true,
	},
	'/saas/product-inventory' : {
		account_types: [all.prefix],
		navigation : 'saas_planning-product_inventory',
		isMainNav  : true,
	},
	'/saas/product-inventory/archived' : {
		account_types: [all.prefix],
		navigation : 'saas_planning-product_inventory',
		isMainNav  : true,
	},
	'/saas/premium-services/order-history' : {
		account_types: [all.prefix],
		navigation : 'saas_premium_services-order_history',
		isMainNav  : true,
	},
	'/saas/premium-services/duties-taxes-calculator' : {
		account_types: [all.prefix],
		navigation:'saas_premium_services-duties_and_taxes',
		isMainNav  : true,
	},
	'/saas/premium-services/trader-eligibility-check' : {
		account_types: [all.prefix],
		navigation:'saas_premium_services-trader_eligibility_check',
		isMainNav  : true,
	},
	'/saas/premium-services/trader-eligibility-check/result' : {
		account_types: [all.prefix],
		navigation:'saas_premium_services-trader_eligibility_check',
		isMainNav  : true,
	}

};

module.exports = saas;
