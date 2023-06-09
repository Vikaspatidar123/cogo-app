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
	IcMTradeparties,
	IcACrossBorder,
	IcMFfreferigeratedCargoType,
	IcMUpwardGraph,
	IcADutiesTaxes,
	IcAFormsAndCertificates,
	IcAFinancial,
	IcADocumentationInfo,
	IcABookYourShipment,
	IcMAppInsurance,
	IcAShipAmber,
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

	app_discover_rates: {
		key       : 'app_discover_rates',
		title     : 'Discover Rates',
		href      : '/v2/book',
		as        : '/v2/book',
		showInNav : true,
	},
	app_bookings: {
		key       : 'app_bookings',
		title     : 'Shipments',
		href      : '/v2/shipments',
		as        : '/v2/shipments',
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
				icon  : (
					<img
						src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/air-tracking.svg"
						alt="cogo"
					/>
				),
				description: 'Track your shipment on the map in real time',
			},
			{
				key   : 'saas_tools-ocean_tracking',
				title : 'Ocean Tracking',
				href  : '/v2/saas/ocean-tracking',
				as    : '/v2/saas/ocean-tracking',
				icon  : <IcAShipAmber width={45} height={45} />,
				description:
                    'Seamlessly keep track of your shipments and deviations',
			},
			{
				key   : 'saas_tools-air_schedules',
				title : 'Air Schedules',
				href  : '/v2/saas/air-schedules',
				as    : '/v2/saas/air-schedules',
				icon  : (
					<img
						src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/air-schedule.svg"
						alt="cogo"
					/>
				),
				description:
                    'Seamlessly keep track of your shipment schedule and deviations',
			},
			{
				key   : 'saas_tools-ocean_schedules',
				title : 'Ocean Schedules',
				href  : '/v2/saas/ocean-schedules',
				as    : '/v2/saas/ocean-schedules',
				icon  : (
					<img
						src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/ocean-schedule.svg"
						alt="cogo"
					/>
				),
				description:
                    'Seamlessly keep track of your shipment schedules and deviations',
			},
			{
				key   : 'saas_tools-hs_code_classification',
				title : 'Product Classification',
				href  : '/v2/saas/hs-classification',
				as    : '/v2/saas/hs-classification',
				icon  : (
					<img
						src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/product-classification.svg"
						alt="cogo"
					/>
				),
				description: 'Find HS Codes with detailed description',
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
				key   : 'saas_premium_services-order_history',
				title : 'Order History',
				href  : '/v2/saas/order-history',
				as    : '/v2/saas/order-history',
				icon  : <IcABookYourShipment width={40} height={40} />,
			},
			{
				key   : 'saas_premium_services-import_export_docs',
				title : 'Import/Export Documents',
				type  : 'link',
				href  : '/v2/saas/premium-services/import-export-doc',
				as    : '/v2/saas/premium-services/import-export-doc',
				icon  : <IcACrossBorder width={40} height={40} />,
			},
			{
				key   : 'saas_premium_services-trader_eligibility_check',
				title : 'Trader Eligibility Check',
				href  : '/v2/saas/premium-services/trader-eligibility-check',
				as    : '/v2/saas/premium-services/trader-eligibility-check',
				icon  : <IcMTradeparties width={42} height={42} fill="#fbd221" />,
			},
			{
				key         : 'saas_premium_services-duties_and_taxes',
				title       : 'Duties & Taxes Calculator',
				href        : '/v2/saas/premium-services/duties-taxes-calculator',
				as          : '/v2/saas/premium-services/duties-taxes-calculator',
				icon        : <IcADutiesTaxes width={45} height={45} />,
				description : '',
			},
			{
				key         : 'saas_premium_services-import_export_controls',
				title       : 'Import Export Controls',
				href        : '/v2/saas/premium-services/import-export-controls',
				as          : '/v2/saas/premium-services/import-export-controls',
				icon        : <IcAFormsAndCertificates width={50} height={50} />,
				description : '',
			},
			{
				key         : 'saas_premium_services-cogo_insurance',
				title       : 'Insurance',
				href        : '/v2/saas/insurance/list',
				as          : '/v2/saas/insurance/list',
				icon        : <IcMAppInsurance width={40} height={40} fill="red" />,
				description : 'Buy insurance for your cargo here',
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
				icon  : (<img
					src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/nav-trade-partners.svg"
					alt="cogo"
					width={40}
					height={40}
					style={{ background: '#fbd221', padding: '5px', borderRadius: '5px' }}
				/>),
				href : '/v2/saas/trade-partner',
				as   : '/v2/saas/trade-partner',
			},
			{
				key   : 'saas_planning-product_inventory',
				title : 'Product Catalog',
				type  : 'link',
				icon  : (<img
					src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/nav-catalog.svg"
					alt="cogo"
					width={40}
					height={40}
					style={{ background: '#fbd221', padding: '5px', borderRadius: '5px' }}
				/>),
				href        : '/v2/saas/product-inventory',
				as          : '/v2/saas/product-inventory',
				module_type : 'dashboards',
			},
			{
				key         : 'saas_planning-quotation',
				title       : 'Quick Quotations',
				// eslint-disable-next-line max-len
				description : 'The meaning of QUOTATION is something that is quoted; especially : a passage ',
				icon        : (<img
					src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/quickQuote.svg"
					alt="cogo"
					width={40}
					height={40}
					style={{ background: '#FAEFEF', padding: '5px', borderRadius: '5px' }}
				/>),
				type : 'link',
				href : '/v2/saas/quickquotation/viewlist',
				as   : '/v2/saas/quickquotation/viewlist',
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
		icon  : (
			<IcADocumentationInfo
				width={20}
				height={20}
			/>
		),
	},

	saas_finance: {
		key   : 'saas_finance',
		title : 'Finance',
		icon  : (
			<IcAFinancial
				width={20}
				height={20}
			/>
		),
		isSubNavs : true,
		isNew     : true,
		options   : [
			{
				key   : 'saas_finance-transaction_history',
				title : 'Transaction History',
				icon  : (
					<IcMFfreferigeratedCargoType
						width={40}
						height={40}
						fill="red"
					/>
				),
				href : '/saas/transaction-history',
				as   : '/saas/transaction-history',
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
		href          : '/v2/settings',
		as            : '/v2/settings',
		showMobileNav : true,

	},
	saas_cogo_subscription: {
		key   : 'saas_cogo_subscription',
		title : 'Subscriptions',
		icon  : (<img
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

};
export default navigationMappings;
