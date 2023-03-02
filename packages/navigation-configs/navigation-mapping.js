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
	IcMCustoms,
	IcMBusinessDashboard,
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
				href        : '/v2/saas/planning/quickquotation/viewlist',
				as          : '/v2/saas/planning/quickquotation/viewlist',
			},
			{
				key   : 'saas_planning-product_inventory',
				title : 'Product Catalog',
				icon  : <IcMBusinessDashboard width={30} height={30} />,
				type  : 'link',
				href  : '/saas/product-inventory',
				as    : '/saas/product-inventory',

			},
			{
				key   : 'saas_planning-trade_partner',
				title : 'Trade Partner',
				icon  : <IcMCustoms width={30} height={30} />,
				type  : 'link',
				href  : '/saas/trade-partner',
				as    : '/saas/trade-partner',

			},
		],
	},

};
export default navigationMappings;
