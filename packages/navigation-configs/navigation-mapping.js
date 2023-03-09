// key is used to identify the navigation
// title is used to show navigation title
// href and as is also used for redirect to navigation page
// type => if type is link then after click it will redirect to coresponding navigation
// showInNav = true => means to show the navigation in both mobile view as well as web view
// showMobileNav = true => means to show navigation in only mobile view
// icon is used to show icon webside only
// mobileIcon is used to show icon in mobile navigation only
// isSubNavs is used to show sub navigations

import { IcMUpwardGraph } from '@cogoport/icons-react';

const navigationMappings = {
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
				key         : 'saas_tools-freight_rate_trend',
				title       : 'Freight Rate Trend',
				href        : '/v2/saas/freight-rate-trend',
				as          : '/v2/saas/freight-rate-trend',
				type        : 'link',
				icon        : <IcMUpwardGraph width={40} height={40} fill="red" />,
				description : 'keep track of freight rates',
			},
		],
	},

	app_accept_terms_and_conditions: {
		key       : 'app_accept_terms_and_conditions',
		title     : 'Terms and Conditions',
		href      : '/accept-terms-and-conditions',
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
		key           : 'app_settings',
		title         : 'Settings',
		href          : '/v2/settings',
		as            : '/v2/settings',
		type          : 'link',
		showMobileNav : true,
	},

};
export default navigationMappings;
