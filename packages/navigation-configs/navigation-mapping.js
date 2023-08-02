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
	IcMAppPayment,
	IcATransactionHistory,
	IcMUsersManageAccounts,
	IcATradeFinance
} from '@cogoport/icons-react';

// eslint-disable-next-line import/no-unresolved, import/extensions
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const navigationMappings = ({ t = () => { } }) => {
	const translationKey = 'common:layouts_app_header_navigation';

	return (
		{
			app_dashboard: {
				key: 'app_dashboard',
				title: t(`${translationKey}_dashboard_label`),
				href: '/dashboard',
				as: '/dashboard',
				showInNav: true,
				mobileIcon: <IcMDashboard width={20} height={20} />,
			},

			app_discover_rates: {
				key: 'app_discover_rates',
				title: t(`${translationKey}_discoverRates_label`),
				href: '/book',
				as: '/book',
				showInNav: true,
				mobileIcon: <IcMContractRates width={20} height={20} />,
			},
			app_bookings: {
				key: 'app_bookings',
				title: t(`${translationKey}_shipments_label`),
				href: '/shipments',
				as: '/shipments',
				icon: 'nav-booking',
				showInNav: true,
				mobileIcon: <IcMBookingDesk width={20} height={20} />,
			},
			saas_tools: {
				key: 'saas_tools',
				title: t(`${translationKey}_tools_label`),
				isSubNavs: true,
				showInNav: true,
				isNew: true,
				options: [
					{
						key: 'saas_tools-freight_rate_trend',
						title: t(`${translationKey}_tools_options_freightRateTrend_label`),
						href: '/saas/freight-rate-trend',
						as: '/saas/freight-rate-trend',
						icon: <IcAFreightRateTrends width={50} height={50} />,
						description: t(`${translationKey}_tools_options_freightRateTrend_description`),
					},
					{
						key: 'saas_tools-air_tracking',
						title: t(`${translationKey}_tools_options_airTracking_label`),
						href: '/saas/air-tracking',
						as: '/saas/air-tracking',
						icon: <IcAAirTracking width={55} height={55} />,
						description: t(`${translationKey}_tools_options_airTracking_description`),
					},
					{
						key: 'saas_tools-ocean_tracking',
						title: t(`${translationKey}_tools_options_oceanTracking_label`),
						href: '/saas/ocean-tracking',
						as: '/saas/ocean-tracking',
						icon: <IcAOceanTracking width={55} height={55} />,
						description: t(`${translationKey}_tools_options_oceanTracking_description`),
					},
					{
						key: 'saas_tools-air_schedules',
						title: t(`${translationKey}_tools_options_airSchedules_label`),
						href: '/saas/air-schedules',
						as: '/saas/air-schedules',
						icon: <IcAAirSchedule width={55} height={55} />,
						description: t(`${translationKey}_tools_options_airSchedules_description`),
					},
					{
						key: 'saas_tools-ocean_schedules',
						title: t(`${translationKey}_tools_options_oceanSchedules_label`),
						href: '/saas/ocean-schedules',
						as: '/saas/ocean-schedules',
						icon: <IcAOceanSchedule width={55} height={55} />,
						description: t(`${translationKey}_tools_options_oceanSchedules_description`),
					},
					{
						key: 'saas_tools-hs_code_classification',
						title: t(`${translationKey}_tools_options_productClassification_label`),
						href: '/saas/hs-classification',
						as: '/saas/hs-classification',
						icon: <IcAProductCatalog width={50} height={50} />,
						description: t(`${translationKey}_tools_options_productClassification_description`),
					},
					{
						key: 'saas_tools-air_ocean_tracking_v2',
						title: t(`${translationKey}_tools_options_trackAndTrace_label`),
						href: '/saas/tools/air-ocean-tracking',
						as: '/saas/tools/air-ocean-tracking',
						icon: <IcATrackAndTrace width={40} height={40} />,
						description: t(`${translationKey}_tools_options_trackAndTrace_description`),
					},
					{
						key: 'saas_tools-vessel_tracking',
						title: t(`${translationKey}_tools_options_liveVessel_label`),
						href: '/saas/live-vessel-tracking',
						as: '/saas/live-vessel-tracking',
						icon: <IcAOceanFcl width={50} height={50} />,
						description: t(`${translationKey}_tools_options_liveVessel_description`),
					},
				],
			},

			saas_premium_services: {
				key: 'saas_premium_services',
				title: t(`${translationKey}_premium_services_label`),
				module_type: 'dashboards',
				showInNav: true,
				isSubNavs: true,
				options: [
					{
						key: 'saas_premium_services-cogo_insurance',
						title: t(`${translationKey}_premium_services_options_insurance_label`),
						href: '/saas/insurance/list',
						as: '/saas/insurance/list',
						icon: <IcAInsurance width={55} height={55} fill="#fbd221" />,
						description: t(`${translationKey}_premium_services_options_insurance_description`),
						supportedCountry: GLOBAL_CONSTANTS.feature_supported_service
							.cargo_insurance.supported_countries,

					},
					{
						key: 'saas_premium_services-export-factoring',
						title: t(`${translationKey}_premium_services_options_exportFactoring_label`),
						href: '/export-factoring',
						as: '/export-factoring',
						icon: <IcATradeFinance width={55} height={55} fill="#fbd221" />,
						description: t(`${translationKey}_premium_services_options_exportFactoring_description`),
						supportedCountry: GLOBAL_CONSTANTS.feature_supported_service.export_factoring

					},
					{
						key: 'saas_premium_services-duties_and_taxes',
						title: t(`${translationKey}_premium_services_options_dutiesTaxes_label`),
						href: '/saas/premium-services/duties-taxes-calculator',
						as: '/saas/premium-services/duties-taxes-calculator',
						icon: <IcADutiesTaxes width={55} height={55} />,
						description: t(`${translationKey}_premium_services_options_dutiesTaxes_description`),

					},
					{
						key: 'saas_premium_services-trader_eligibility_check',
						title: t(`${translationKey}_premium_services_options_traderEligibility_label`),
						href: '/saas/premium-services/trader-eligibility-check',
						as: '/saas/premium-services/trader-eligibility-check',
						icon: <IcAEligibilityCheck width={55} height={55} />,
						description: t(`${translationKey}_premium_services_options_traderEligibility_description`),
					},
					{
						key: 'saas_premium_services-import_export_docs',
						title: t(`${translationKey}_premium_services_options_importExportDocuments_label`),
						type: 'link',
						href: '/saas/premium-services/import-export-doc',
						as: '/saas/premium-services/import-export-doc',
						icon: <IcADocumentTemplates width={55} height={55} />,
						description: t(`${translationKey}_premium_services_options_importExportDocuments_description`),
					},
					{
						key: 'saas_premium_services-import_export_controls',
						title: t(`${translationKey}_premium_services_options_importExportControls_label`),
						href: '/saas/premium-services/import-export-controls',
						as: '/saas/premium-services/import-export-controls',
						icon: <IcAFormsAndCertificates width={45} height={45} />,
						description: t(`${translationKey}_premium_services_options_importExportControls_description`),
					},
					{
						key: 'saas_premium_services-order_history',
						title: t(`${translationKey}_premium_services_options_orderHistory_label`),
						href: '/saas/order-history',
						as: '/saas/order-history',
						icon: <IcABookYourShipment width={55} height={55} />,
						description: t(`${translationKey}_premium_services_options_orderHistory_description`),

					},
				],
			},
			saas_planning: {
				key: 'saas_planning',
				title: t(`${translationKey}_planning_label`),
				isSubNavs: true,
				showInNav: true,
				options: [
					{
						key: 'saas_planning-trade_partner',
						title: t(`${translationKey}_planning_options_tradePartner_label`),
						icon: <IcATradePartner width={50} height={50} fill="#fbd221" />,
						href: '/saas/trade-partner',
						as: '/saas/trade-partner',
						description: t(`${translationKey}_planning_options_tradePartner_description`),
					},
					{
						key: 'saas_planning-product_inventory',
						title: t(`${translationKey}_planning_options_productCatalog_label`),
						type: 'link',
						icon: <IcAProductCatalog width={55} height={55} />,
						href: '/saas/product-inventory',
						as: '/saas/product-inventory',
						module_type: 'dashboards',
						description: t(`${translationKey}_planning_options_productCatalog_description`),
					},
					{
						key: 'saas_planning-quotation',
						title: t(`${translationKey}_planning_options_quickQuotations_label`),
						icon: <IcAProfessionalQuotations width={50} height={55} />,
						type: 'link',
						href: '/saas/quickquotation/viewlist',
						as: '/saas/quickquotation/viewlist',
						description: t(`${translationKey}_planning_options_quickQuotations_description`),

					},
					{
						key: 'saas_planning-contract_management',
						title: t(`${translationKey}_planning_options_contractManagement_label`),
						href: '/contract-management',
						as: '/contract-management',
						icon: <IcAPlanningTools width={60} height={58} fill="#fbd221" />,
						description: t(`${translationKey}_planning_options_contractManagement_description`),
					},
					{
						key: 'saas_planning-manage_rfq',
						title: t(`${translationKey}_planning_options_manageRfq_label`),
						href: '/manage-rfq',
						as: '/manage-rfq',
						icon: <IcARfq width={70} height={64} />,
						description: t(`${translationKey}_planning_options_manageRfq_description`),
					},
				],
			},

			app_accept_terms_and_conditions: {
				key: 'app_accept_terms_and_conditions',
				title: t(`${translationKey}_termsAndConditions_label`),
				href: '/accept-terms-and-conditions',
				showInNav: false,
			},

			app_documents: {
				key: 'app_documents',
				title: t(`${translationKey}_documentWallet_label`),
				href: '/documents',
				as: '/documents',
				icon: <IcADocumentationInfo width={20} height={20} />,
			},

			saas_finance: {
				key: 'saas_finance',
				title: t(`${translationKey}_finance_label`),
				icon: <IcAFinancial width={20} height={20} />,
				isSubNavs: true,
				isNew: true,
				options: [
					{
						key   : 'saas_finance-transaction_history',
						title : t(`${translationKey}_finance_options_transactionHistory_label`),
						href  : '/saas/transaction-history',
						as    : '/saas/transaction-history',
						icon  : <IcATransactionHistory width={20} height={20} />,
					},
					{
						key   : 'saas_finance-payment_dashboard',
						title : t(`${translationKey}_finance_options_paymentDashboard_label`),
						href  : '/payment-dashboard',
						as    : '/payment-dashboard',
						icon  : <IcMAppPayment width={20} height={20} />,
					},
				],
			},

			app_get_started: {
				key: 'app_get_started',
				title: t(`${translationKey}_getStarted_label`),
				theme: 'green',
			},

			app_kyc: {
				key: 'app_kyc',
				title: t(`${translationKey}_kyc_label`),
				href: '/kyc',
				as: '/kyc',
				showInNav: false,
			},
			app_settings: {
				key: 'app_settings',
				title: t(`${translationKey}_settings_label`),
				href: '/settings',
				as: '/settings',
				showMobileNav: true,
			},
			saas_cogo_subscription: {
				key: 'saas_cogo_subscription',
				title: t(`${translationKey}_subscriptions_label`),
				icon: (
					<img
						src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/nav-subscriptions.svg"
						alt="cogo"
					/>
				),
				isSubNavs: true,
				options: [
					{
						key   : 'saas_cogo_subscription-manage',
						title : t(`${translationKey}_subscriptions_options_manageSubscription_label`),
						href  : '/saas/cogo-subscriptions/manage-subscription',
						as    : '/saas/cogo-subscriptions/manage-subscription',
						icon  : <IcMUsersManageAccounts width={20} height={20} />,
					},
					{
						key   : 'saas_cogo_subscription-balance_history',
						title : t(`${translationKey}_subscriptions_options_balanceAndHistory_label`),
						type  : 'link',
						href  : '/saas/cogo-subscriptions/balance-history',
						as    : '/saas/cogo-subscriptions/balance-history',
						icon  : <IcATransactionHistory width={20} height={20} />,
					},
				],
			},
			pay_later: {
				key: 'pay_later',
				title: t(`${translationKey}_payLater_label`),
				href: '/v2/pay-later',
				as: '/v2/pay-later',
			},
			saas_cogopoint: {
				key: 'saas_cogopoint',
				title: t(`${translationKey}_cogopoint_label`),
				href: '/saas/cogopoint',
				as: '/saas/cogopoint',
				showInNav: false,

			},

		}
	);
};
export default navigationMappings;
