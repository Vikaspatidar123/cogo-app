// key is used to identify the navigation is same as declear in admin side
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
	IcMUpwardGraph,
	IcMTradeparties,
	IcACrossBorder,
	IcMProductCodeMapping,
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

	saas_tools: {
		key       : 'saas_tools',
		title     : 'Tools',
		icon      : 'nav-tools',
		isSubNavs : true,
		showInNav : true,
		isNew     : true,
		options   : [
			{
				key         : 'saas_tools-freight_rate_trend',
				title       : 'Freight Rate Trend',
				href        : '/v2/saas/freight-rate-trend',
				as          : '/v2/saas/freight-rate-trend',
				icon        : <IcMUpwardGraph width={40} height={40} fill="red" />,
				description : 'keep track of freight rates',
			},
			{
				key   : 'saas_tools-air_tracking',
				title : 'Air Tracking',
				href  : '/v2/saas/air-tracking',
				as    : '/v2/saas/air-tracking',
				icon  : <img
					src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/air-tracking.svg"
					alt="cogo"
				/>,
				description: 'Track your shipment on the map in real time',
			},
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
				key   : 'saas_premium_services-order_history',
				title : 'Order History',
				href  : '/v2/saas/order-history',
				as    : '/v2/saas/order-history',
				icon  : <IcACrossBorder width={40} height={40} />,
			},
		],
	},

	saas_planning: {
		key       : 'saas_planning',
		title     : 'Planning',
		isSubNavs : true,
		showInNav : true,
		options   : [
			{
				key   : 'saas_planning-trade_partner',
				title : 'Trade Partner',
				icon  : <IcMTradeparties width={40} height={40} />,
				href  : '/v2/saas/trade-partner',
				as    : '/v2/saas/trade-partner',
			},
			{
				key         : 'saas_planning-product_inventory',
				title       : 'Product Catalog',
				type        : 'link',
				icon        : <IcMProductCodeMapping width={40} height={40} />,
				href        : '/v2/saas/product-inventory',
				as          : '/v2/saas/product-inventory',
				module_type : 'dashboards',
			},
		],
	},

	app_accept_terms_and_conditions: {
		key       : 'app_accept_terms_and_conditions',
		title     : 'Terms and Conditions',
		href      : '/accept-terms-and-conditions',
		type      : 'link',
		showInNav : false,
	},

	app_get_started: {
		key   : 'app_get_started',
		title : 'Get Started',
		theme : 'green',
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

		],
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
