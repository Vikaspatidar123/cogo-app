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

	saas_cogo_insurance: {
		key         : 'saas_tools_insurance',
		title       : 'Insurance',
		href        : '/v2/saas/insurance/list',
		as          : '/v2/saas/insurance/list',
		type        : 'link',
		icon        : <IcMFfreferigeratedCargoType width={40} height={40} fill="red" />,
		description : 'Buy insurance for your cargo here',
		showInNav   : true,
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
