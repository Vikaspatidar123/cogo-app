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
	IcMContractRates,
	IcMFfreferigeratedCargoType,
	IcADutiesTaxes,
	IcAFormsAndCertificates,
	IcAFinancial,
	IcADocumentationInfo,
	IcABookYourShipment,
	IcAInsurance,
	IcAOceanTracking,
	IcAAirTracking,
	IcAAirSchedule,
	IcAOceanSchedule,
	IcAFreightRateTrends,
	IcAProductCatalog,
	IcAEligibilityCheck,
	IcADocumentTemplates,
	IcAProfessionalQuotations,
	IcATrackAndTrace,
	IcAOceanFcl,
	IcMDashboard,
	IcMBookingDesk,
	IcATradePartner,
	IcAPlanningTools,
	IcARfq,
} from '@cogoport/icons-react';

const navigationMappings = {
	app_dashboard: {
		key        : 'app_dashboard',
		title      : 'Dashboard',
		href       : '/dashboard',
		as         : '/dashboard',
		showInNav  : true,
		mobileIcon : <IcMDashboard width={20} height={20} />,
	},

	app_discover_rates: {
		key        : 'app_discover_rates',
		title      : 'Discover Rates',
		href       : '/book',
		as         : '/book',
		showInNav  : true,
		mobileIcon : <IcMContractRates width={20} height={20} />,
	},
	app_bookings: {
		key        : 'app_bookings',
		title      : 'Shipments',
		href       : '/shipments',
		as         : '/shipments',
		icon       : 'nav-booking',
		showInNav  : true,
		mobileIcon : <IcMBookingDesk width={20} height={20} />,
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
				href        : '/saas/freight-rate-trend',
				as          : '/saas/freight-rate-trend',
				icon        : <IcAFreightRateTrends width={50} height={50} />,
				description : 'See past rates and future prediction to plan better',
			},
			{
				key         : 'saas_tools-air_tracking',
				title       : 'Air Tracking',
				href        : '/saas/air-tracking',
				as          : '/saas/air-tracking',
				icon        : <IcAAirTracking width={55} height={55} />,
				description : 'Track your air cargo realtime on the map',
			},
			{
				key         : 'saas_tools-ocean_tracking',
				title       : 'Ocean Tracking',
				href        : '/saas/ocean-tracking',
				as          : '/saas/ocean-tracking',
				icon        : <IcAOceanTracking width={55} height={55} />,
				description : 'Track your ocean cargo realtime on the map ',
			},
			{
				key         : 'saas_tools-air_schedules',
				title       : 'Air Schedules',
				href        : '/saas/air-schedules',
				as          : '/saas/air-schedules',
				icon        : <IcAAirSchedule width={55} height={55} />,
				description : 'Know the various airline schedules on your route',
			},
			{
				key         : 'saas_tools-ocean_schedules',
				title       : 'Ocean Schedules',
				href        : '/saas/ocean-schedules',
				as          : '/saas/ocean-schedules',
				icon        : <IcAOceanSchedule width={55} height={55} />,
				description : 'Know the various ship schedules on your route',
			},
			{
				key         : 'saas_tools-hs_code_classification',
				title       : 'Product Classification',
				href        : '/saas/hs-classification',
				as          : '/saas/hs-classification',
				icon        : <IcAProductCatalog width={50} height={50} />,
				description : 'Find the HS code of any product or vice versa',
			},
			{
				key         : 'saas_tools-air_ocean_tracking_v2',
				title       : 'Track and Trace',
				href        : '/saas/tools/air-ocean-tracking',
				as          : '/saas/tools/air-ocean-tracking',
				icon        : <IcATrackAndTrace width={40} height={40} />,
				description : 'Track and Trace your shipments',
			},
			{
				key         : 'saas_tools-vessel_tracking',
				title       : 'Live Vessel Tracking',
				href        : '/saas/live-vessel-tracking',
				as          : '/saas/live-vessel-tracking',
				icon        : <IcAOceanFcl width={50} height={50} />,
				description : 'Real time vessel position',
			},
		],
	},

	saas_premium_services: {
		key         : 'saas_premium_services',
		title       : 'Premium Services',
		// type: 'link',
		icon        : 'nav-premium-services',
		module_type : 'dashboards',
		isNew       : true,
		line        : true,
		showInNav   : true,
		isSubNavs   : true,
		options     : [
			{
				key         : 'saas_premium_services-cogo_insurance',
				title       : 'Insurance',
				href        : '/saas/insurance/list',
				as          : '/saas/insurance/list',
				icon        : <IcAInsurance width={55} height={55} fill="#fbd221" />,
				description : 'Secure your cargo and avoid high unwanted costs',
			},
			{
				key   : 'saas_premium_services-duties_and_taxes',
				title : 'Duties & Taxes Calculator',
				href  : '/saas/premium-services/duties-taxes-calculator',
				as    : '/saas/premium-services/duties-taxes-calculator',
				icon  : <IcADutiesTaxes width={55} height={55} />,
				description:
					'Know the total amount you will have to pay to plan better',
			},
			{
				key         : 'saas_premium_services-trader_eligibility_check',
				title       : 'Trader Eligibility Check',
				href        : '/saas/premium-services/trader-eligibility-check',
				as          : '/saas/premium-services/trader-eligibility-check',
				icon        : <IcAEligibilityCheck width={55} height={55} />,
				description : 'Check that your parter is legally permitted to trade',
			},
			{
				key         : 'saas_premium_services-import_export_docs',
				title       : 'Import/Export Documents',
				type        : 'link',
				href        : '/saas/premium-services/import-export-doc',
				as          : '/saas/premium-services/import-export-doc',
				icon        : <IcADocumentTemplates width={55} height={55} />,
				description : 'Know the documents you would need to avoid delays',
			},
			{
				key         : 'saas_premium_services-import_export_controls',
				title       : 'Import Export Controls',
				href        : '/saas/premium-services/import-export-controls',
				as          : '/saas/premium-services/import-export-controls',
				icon        : <IcAFormsAndCertificates width={45} height={45} />,
				description : 'Know the laws to avoid non compliance penalties',
			},
			{
				key   : 'saas_premium_services-order_history',
				title : 'Order History',
				href  : '/saas/order-history',
				as    : '/saas/order-history',
				icon  : <IcABookYourShipment width={55} height={55} />,
				description:
					'View when and which premium services you used previously ',
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
				key         : 'saas_planning-trade_partner',
				title       : 'Trade Partner',
				icon        : <IcATradePartner width={50} height={50} fill="#fbd221" />,
				href        : '/saas/trade-partner',
				as          : '/saas/trade-partner',
				description : 'View a detailed list of all your trade partners ',
			},
			{
				key         : 'saas_planning-product_inventory',
				title       : 'Product Catalog',
				type        : 'link',
				icon        : <IcAProductCatalog width={55} height={55} />,
				href        : '/saas/product-inventory',
				as          : '/saas/product-inventory',
				module_type : 'dashboards',
				description : 'Find all the products you trade in on one page',
			},
			{
				key         : 'saas_planning-quotation',
				title       : 'Quick Quotations',
				description : 'Send and receive quotes accurately pre formatted',
				icon        : <IcAProfessionalQuotations width={55} height={55} />,
				type        : 'link',
				href        : '/saas/quickquotation/viewlist',
				as          : '/saas/quickquotation/viewlist',
			},
			{
				key         : 'saas_planning-contract_management',
				title       : 'Contract Management',
				href        : '/contract-management',
				as          : '/contract-management',
				icon        : <IcAPlanningTools width={40} height={40} fill="#fbd221" />,
				description : 'View all your contracts and consume directly from one place',
			},
			{
				key         : 'saas_planning-manage_rfq',
				title       : 'Manage Rfq',
				href        : '/manage-rfq',
				as          : '/manage-rfq',
				icon        : <IcARfq width={40} height={40} />,
				description : 'Create and Manage your RFQ for comparison and bulk buying',
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
		key   : 'app_documents',
		title : 'Document Wallet',
		href  : '/documents',
		as    : '/documents',
		icon  : <IcADocumentationInfo width={20} height={20} />,
	},

	saas_finance: {
		key       : 'saas_finance',
		title     : 'Finance',
		icon      : <IcAFinancial width={20} height={20} />,
		isSubNavs : true,
		isNew     : true,
		options   : [
			{
				key   : 'saas_finance-transaction_history',
				title : 'Transaction History',
				icon  : <IcMFfreferigeratedCargoType width={40} height={40} />,
				href  : '/saas/transaction-history',
				as    : '/saas/transaction-history',
			},
		],
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
		showInNav : false,
	},
	app_settings: {
		key           : 'app_settings',
		title         : 'Settings',
		href          : '/settings',
		as            : '/settings',
		showMobileNav : true,
	},
	saas_cogo_subscription: {
		key   : 'saas_cogo_subscription',
		title : 'Subscriptions',
		icon  : (
			<img
				src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/nav-subscriptions.svg"
				alt="cogo"
			/>
		),
		isSubNavs : true,
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
	pay_later: {
		key   : 'pay_later',
		title : 'Pay Later',
		href  : '/v2/pay-later',
		as    : '/v2/pay-later',
	},
	saas_cogopoint: {
		key       : 'saas_cogopoint',
		title     : 'Cogopoint',
		href      : '/saas/cogopoint',
		as        : '/saas/cogopoint',
		showInNav : false,

	},
};
export default navigationMappings;
