const navigationMappings = {
	app_dashboard: {
		key   : 'app_dashboard',
		title : 'Dashboard',
		href  : '/v2/dashboard',
		as    : '/v2/dashboard',
		type  : 'link',
		icon  : 'nav-tasks',
	},
	planning: {
		title   : 'Planning',
		key     : 'planning',
		options : [
			{
				key   : 'saas_quotation',
				title : 'Quick Quotations',
				type  : 'link',
				href  : '/saas/quickquotation/viewlist',
				as    : '/saas/quickquotation/viewlist',
				isNew : true,
			},
			{
				key       : 'saas_product_inventory',
				title     : 'Product Catalog',
				href      : '/saas/product-inventory',
				as        : '/saas/product-inventory',
				type      : 'link',
				isNew     : true,
				showInNav : true,
			},
			{
				key       : 'saas_trade_partner',
				title     : 'Trade Partner',
				href      : '/saas/trade-partner',
				as        : '/saas/trade-partner',
				type      : 'link',
				icon      : 'nav-trade-partner',
				isNew     : true,
				showInNav : true,
				line      : true,
			},
		],
	},
	premium_services: {
		title   : 'Premium Services',
		key     : 'premium_services',
		options : [
			{
				key   : 'saas_premium_services-duties_and_taxes',
				title : 'Duties & Taxes Calculator',
				href  : '/saas/premium-services/duties-taxes-calculator',
				as    : '/saas/premium-services/duties-taxes-calculator',

			},
			{
				key   : 'saas_premium_services-order_history',
				title : 'Order History',
				href  : '/saas/premium-services/order-history',
				as    : '/saas/premium-services/order-history',

			},
			{
				key   : 'saas_premium_services-trader_eligibility_check',
				title : 'Trader Eligibility Check',
				href  : '/saas/premium-services/trader-eligibility-check',
				as    : '/saas/premium-services/trader-eligibility-check',
			},
		],
	},
	app_bookings: {
		// options: [{
		key   : 'app_bookings',
		title : 'Shipments',
		href  : '/shipments',
		as    : '/shipments',
		type  : 'link',
		// }],
	},
	saas_insurance: {
		key   : 'saas_insurance',
		title : 'Insurance',
		href  : '/saas/insurance/list',
		as    : '/saas/insurance/list',
		type  : 'link',
	},
	finance: {
		title   : 'Finance',
		key     : 'finance',
		options : [
			{
				key   : 'saas_transaction_history',
				title : 'Transaction History',
				icon  : 'nav-transaction-history',
				type  : 'link',
				href  : '/saas/transaction-history',
				as    : '/saas/transaction-history',

			}, {
				key   : 'payment_dashboard',
				title : 'Payment Dashboard',
				href  : '/payment-dashboard',
				as    : '/payment-dashboard',
				type  : 'link',
			}],
	},
	tools: {
		title   : 'Tools',
		key     : 'tools',
		options : [
			{
				key   : 'app_discover_rates',
				title : 'Discover Rates',
				href  : '/book',
				as    : '/book',
			},
			{
				key   : 'app_documents',
				title : 'Documents',
				type  : 'link',
				// icon: 'nav-MySchedules',
				as    : '/documents/org_documents',
				href  : '/documents/[doc_type]',
			}, {
				key   : 'saas_tracking-map_dashboard',
				title : 'My Shipments',
				// icon: 'nav-my-schedules',
				href  : '/saas/map-dashboard',
				as    : '/saas/map-dashboard',
				type  : 'link',
			},
			{
				key   : 'saas_tracking-air_tracking',
				title : 'Air Tracking',
				href  : '/saas/air-tracking',
				as    : '/saas/air-tracking',
				type  : 'link',
			},
			{
				key   : 'saas_tracking-ocean_tracking',
				title : 'Ocean Tracking',
				href  : '/saas/tracking',
				as    : '/saas/tracking',
				type  : 'link',
			}, {
				key   : 'hs_code_classification',
				title : 'Product Classification',
				href  : '/saas/hs-classification',
				as    : '/saas/hs-classification',
				type  : 'link',
			}, {
				key   : 'saas_schedules-air_schedules',
				title : 'Air Schedules',
				href  : '/saas/air-schedules',
				as    : '/saas/air-schedules',
			}, {
				key   : 'saas_schedules-ocean_schedules',
				title : 'Ocean Schedules',
				href  : '/saas/schedules',
				as    : '/saas/schedules',
			}],
	},
};

export default navigationMappings;
