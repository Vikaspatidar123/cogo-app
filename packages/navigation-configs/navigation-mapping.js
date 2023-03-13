// key is used to identify the navigation
// title is used to show navigation title
// href and as is also used for redirect to navigation page
// type => if type is link then after click it will redirect to coresponding navigation
// showInNav = true => means to show the navigation in both mobile view as well as web view
// showMobileNav = true => means to show navigation in only mobile view
// icon is used to show icon webside only
// mobileIcon is used to show icon in mobile navigation only
// isSubNavs is used to show sub navigations

const navigationMappings = {
	app_dashboard: {
		key       : 'app_dashboard',
		title     : 'Dashboard',
		href      : '/v2/dashboard',
		as        : '/v2/dashboard',
		showInNav : true,
	},
	saas_planning: {
		key       : 'saas_planning',
		title     : 'Planning',
		isSubNavs : true,
		showInNav : true,
		options   : [
			{
				key   : 'saas_planning-product_inventory',
				title : 'Product Catalog',
				icon  : (
					<img
						src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/product-classification.svg"
						alt="cogo"
					/>
				),
				href : '/v2/saas/product-inventory',
				as   : '/v2/saas/product-inventory',
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
		key       : 'app_settings',
		title     : 'Settings',
		href      : '/settings',
		as        : '/settings',
		type      : 'link',
		showInNav : false,
	},
};
export default navigationMappings;
