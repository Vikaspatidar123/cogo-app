// key is used to identify the navigation
// title is used to show navigation title
// href and as is also used for redirect to navigation page
// type => if type is link then after click it will redirect to coresponding navigation
// showInNav = true => means to show the navigation in both mobile view as well as web view
// showMobileNav = true => means to show navigation in only mobile view
// icon is used to show icon webside only
// mobileIcon is used to show icon in mobile navigation only
// isSubNavs is used to show sub navigations

import { IcMAverage } from '@cogoport/icons-react';

const navigationMappings = {
	app_dashboard: {
		key         : 'app_dashboard',
		title       : 'Dashboard',
		href        : '/v2/dashboard',
		as          : '/v2/dashboard',
		type        : 'link',
		module_type : 'dashboards',
		showInNav   : true,
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
				key   : 'saas_premium_services-duties_and_taxes',
				title : 'Duties & Taxes Calculator',
				href  : '/v2/saas/premium-services/duties-taxes-calculator',
				as    : '/v2/saas/premium-services/duties-taxes-calculator',
				icon  : <IcMAverage width={40} height={40} fill="red" />,
				type  : 'link',
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

	app_kyc: {
		key       : 'app_kyc',
		title     : 'KYC',
		href      : '/kyc',
		as        : '/kyc',
		type      : 'link',
		showInNav : false,
	},
	app_settings: {
		key       : 'app_settings',
		title     : 'Settings',
		href      : '/settings',
		as        : '/settings',
		type      : 'link',
		showInNav : false,
	},
};
export default navigationMappings;
