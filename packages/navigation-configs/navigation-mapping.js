// key is used to identify the navigation
// title is used to show navigation title
// href and as is also used for redirect to navigation page
// type => if type is link then after click it will redirect to coresponding navigation
// showInNav = true => means to show the navigation in both mobile view as well as web view
// showMobileNav = true => means to show navigation in only mobile view
// icon is used to show icon webside only
// mobileIcon is used to show icon in mobile navigation only
// isSubNavs is used to show sub navigations

import { IcMUpwardGraph, IcMQuotations } from '@cogoport/icons-react';

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
				icon        : <IcMUpwardGraph width={40} height={40} fill="red" />,
				description : 'keep track of freight rates',
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
	saas_planning: {
		key       : 'saas_planning',
		title     : 'Planning',
		showInNav : true,
		isSubNavs : true,
		options   : [
			{
				key         : 'saas_planning-quotation',
				title       : 'Quick Quotations',
				// eslint-disable-next-line max-len
				description : 'The meaning of QUOTATION is something that is quoted; especially : a passage ',
				icon        : <IcMQuotations width={30} height={30} />,
				type        : 'link',
				href        : '/v2/saas/quickquotation/viewlist',
				as          : '/v2/saas/quickquotation/viewlist',
			},

		],
	},

};
export default navigationMappings;
