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
	saas_cogo_subscription: {
		key       : 'saas_cogo_subscription',
		title     : 'Subscriptions',
		icon      : 'nav-subscriptions',
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
