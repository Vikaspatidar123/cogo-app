// key is used to identify the navigation
// title is used to show navigation title
// href and as is also used for redirect to navigation page
// type => if type is link then after click it will redirect to coresponding navigation
// showInNav = true => means to show the navigation in both mobile view as well as web view
// showMobileNav = true => means to show navigation in only mobile view
// icon is used to show icon webside only
// mobileIcon is used to show icon in mobile navigation only
// isSubNavs is used to show sub navigations

import {
	IcMQuotations,
	IcMProductCodeMapping,
	IcMTradeparties,
	IcMAverage,
	IcACrossBorder,
	IcMFfreferigeratedCargoType,
} from '@cogoport/icons-react';

const navigationMappings = {
	app_dashboard: {
		key        : 'app_dashboard',
		title      : 'Dashboard',
		href       : '/v2/dashboard',
		as         : '/v2/dashboard',
		showInNav  : true,
		mobileIcon : <IcMQuotations width={20} height={20} />,

	},

	saas_planning: {
		key       : 'saas_planning',
		title     : 'Planning',
		isSubNavs : true,
		showInNav : true,
		options   : [
			{
				key   : 'saas_planning-quotation',
				title : 'Quick Quotations',
				icon  : <IcMQuotations width={40} height={40} />,
				href  : '/saas/quickquotation/viewlist',
				as    : '/saas/quickquotation/viewlist',
			},
			{
				key   : 'saas_planning-product_inventory',
				title : 'Product Catalog',
				icon  : <IcMProductCodeMapping width={40} height={40} />,
				href  : '/saas/product-inventory',
				as    : '/saas/product-inventory',
			},
			{
				key   : 'saas_planning-trade_partner',
				title : 'Trade Partner',
				icon  : <IcMTradeparties width={40} height={40} />,
				href  : '/v2/saas/trade-partner',
				as    : '/v2/saas/trade-partner',
				type  : 'link',
			},
		],
	},
	saas_premium_services: {
		key         : 'saas_premium_services',
		title       : 'Premium Services',
		icon        : 'nav-premium-services',
		module_type : 'dashboards',
		isNew       : true,
		showInNav   : true,
		isSubNavs   : true,
		options     : [
			{
				key   : 'saas_premium_services-duties_and_taxes',
				title : 'Duties & Taxes Calculator',
				href  : '/v2/saas/premium-services/duties-taxes-calculator',
				as    : '/v2/saas/premium-services/duties-taxes-calculator',
				icon  : <IcMAverage width={40} height={40} fill="red" />,
			},
			{
				key   : 'saas_premium_services-order_history',
				title : 'Order History',
				href  : '/v2/saas/order-history',
				as    : '/v2/saas/order-history',
				icon  : <IcACrossBorder width={40} height={40} />,
				type  : 'link',
			},
			{
				key   : 'saas_premium_services-trader_eligibility_check',
				title : 'Trader Eligibility Check',
				href  : '/v2/saas/premium-services/trader-eligibility-check',
				as    : '/v2/saas/premium-services/trader-eligibility-check',
				icon  : <IcMTradeparties width={40} height={40} fill="red" />,
			},
		],
	},
	app_bookings: {
		key       : 'app_bookings',
		title     : 'Shipments',
		href      : '/shipments',
		as        : '/shipments',
		icon      : 'nav-booking',
		showInNav : true,
	},

	saas_tools: {
		key       : 'saas_tools',
		title     : 'Tools',
		icon      : 'nav-tools',
		isSubNavs : true,
		showInNav : true,
		isNew     : true,
		options   : [
			{
				key   : 'saas_tools-hs_code_classification',
				title : 'Product Classification',
				href  : '/v2/saas/hs-classification',
				as    : '/v2/saas/hs-classification',
				icon  : <img
					src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/product-classification.svg"
					alt="cogo"
				/>,
				description: 'Find HS Codes with detailed description',
			},
			{
				key   : 'saas_tools-air_tracking',
				title : 'Air Tracking',
				href  : '/saas/air-tracking',
				as    : '/saas/air-tracking',
				icon  : <img
					src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/air-tracking.svg"
					alt="cogo"
				/>,
				description: 'Track your shipment on the map in real time',
			},
			{
				key   : 'saas_tools-air_schedules',
				title : 'Air Schedules',
				href  : '/saas/air-schedules',
				as    : '/saas/air-schedules',
				icon  : <img
					src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/air-schedule.svg"
					alt="cogo"

				/>,
				description: 'Find sailing schedule for multiple air lines by route or vessel',
			},
			{
				key   : 'saas_tools-ocean_tracking',
				title : 'Ocean Tracking',
				href  : '/saas/tracking',
				as    : '/saas/tracking',
				icon  : <img
					src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/ocean-tracking.svg"
					alt="cogo"
				/>,
				description: 'Seamlessly keep track of your shipments and deviations',
			},
			{
				key   : 'saas_tools-ocean_schedules',
				title : 'Ocean Schedules',
				href  : '/saas/schedules',
				as    : '/saas/schedules',
				icon  : <img
					src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/ocean-schedule.svg"
					alt="cogo"
				/>,
				description: 'Find sailing schedule with real time port congestion data',
			},
			{
				key   : 'saas_tools-freight_rate_trend',
				title : 'Freight Rate Trend',
				href  : '/v2/saas/freight-rate-trend',
				as    : '/v2/saas/freight-rate-trend',
				type  : 'link',
				icon  : <IcMFfreferigeratedCargoType width={40} height={40} fill="red" />,
			},
			{
				key         : 'saas_tools-load_calculator',
				title       : 'Load Calculator',
				href        : '/v2/saas/load-calculator',
				as          : '/v2/saas/load-calculator',
				type        : 'link',
				icon        : <IcMFfreferigeratedCargoType width={40} height={40} fill="red" />,
				description : 'the smart engine for transport stuffing',
			},
		],
	},

	saas_finance: {
		key       : 'saas_finance',
		title     : 'Finance',
		icon      : 'nav-finance',
		isSubNavs : true,
		isNew     : true,
		options   : [
			{
				key   : 'saas_finance-transaction_history',
				title : 'Transaction History',
				icon  : <IcMFfreferigeratedCargoType width={40} height={40} fill="red" />,
				href  : '/saas/transaction-history',
				as    : '/saas/transaction-history',
			},
			{
				key   : 'saas_finance-payment_dashboard',
				title : 'Payment Dashboard',
				href  : '/payment-dashboard',
				as    : '/payment-dashboard',
				icon  : <IcMFfreferigeratedCargoType width={40} height={40} fill="red" />,
			},
		],
	},

	app_accept_terms_and_conditions: {
		key       : 'app_accept_terms_and_conditions',
		title     : 'Terms and Conditions',
		href      : '/accept-terms-and-conditions',
		showInNav : false,
	},
	app_documents: {
		key     : 'app_documents',
		title   : 'Documents',
		icon    : 'nav-documents',
		as      : '/documents/org_documents',
		href    : '/documents/[doc_type]',
		options : [
			{
				title : 'Documents',
				icon  : 'nav-MySchedules',
				as    : '/documents/org_documents',
				href  : '/documents/[doc_type]',
			},
			{
				title : 'Draft Templates',
				icon  : 'nav-quotes',
				as    : '/documents/trade_documents',
				href  : '/documents/[doc_type]',
			},
		],
	},
	saas_schedules: {
		key         : 'saas_schedules',
		title       : 'Schedules',
		icon        : 'nav-main-schedules',
		module_type : 'dashboards',
		isSubNavs   : true,
		showInNav   : false,
		options     : [
			{
				key   : 'saas_schedules-map_dashboard',
				title : 'My Schedules',
				icon  : 'nav-my-schedules',
				href  : '/saas/schedule-map-dashboard',
				as    : '/saas/schedule-map-dashboard',
			},
		],
	},

	saas_cogo_insurance: {
		key         : 'saas_tools_insurance',
		title       : 'Insurance',
		href        : '/v2/saas/insurance',
		as          : '/v2/saas/insurance',
		type        : 'link',
		icon        : <IcMFfreferigeratedCargoType width={40} height={40} fill="red" />,
		description : 'Buy insurance for your cargo here',
		showInNav   : true,
	},

	saas_tracking: {
		key       : 'saas_tracking',
		title     : 'Track & Trace',
		type      : 'link',
		isSubNavs : true,
		showInNav : false,
		options   : [
			{
				key   : 'saas_tracking-map_dashboard',
				title : 'My Shipments',
				href  : '/saas/map-dashboard',
				as    : '/saas/map-dashboard',
				type  : 'link',
			},
		],
	},

	saas_cogo_subscription: {
		key       : 'saas_cogo_subscription',
		title     : 'Subscriptions',
		icon      : 'nav-subscriptions',
		isSubNavs : true,
		isNew     : true,
		options   : [
			{
				key   : 'saas_cogo_subscription-manage',
				title : 'Manage Subscription',
				type  : 'link',
				icon  : 'nav-documents',
				href  : '/saas/cogo-subscriptions/manage-subscription',
				as    : '/saas/cogo-subscriptions/manage-subscription',
			},
			{
				key   : 'saas_cogo_subscription-balance_history',
				title : 'Balance And History',
				type  : 'link',
				icon  : 'nav-payments',
				href  : '/saas/cogo-subscriptions/balance-history',
				as    : '/saas/cogo-subscriptions/balance-history',
			},
		],
	},
	saas_subscription: {
		key   : 'saas_subscription',
		title : 'Manage Subscriptions',
		href  : '/saas/subscriptions',
		as    : '/saas/subscriptions',
		type  : 'link',
		icon  : <img
			src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/manage-subscription.svg"
			alt="cogo"
		/>,
		showInNav: false,

	},
	app_get_started: {
		key   : 'app_get_started',
		title : 'Get Started',
		theme : 'green',

	},

	app_kyc: {
		key       : 'app_kyc',
		title     : 'KYC',
		href      : '/kyc',
		as        : '/kyc',
		type      : 'link',
		showInNav : false,

	},
	app_settings: {
		key           : 'app_settings',
		title         : 'Settings',
		href          : '/v2/settings',
		as            : '/v2/settings',
		type          : 'link',
		showMobileNav : true,

	},

};
export default navigationMappings;
