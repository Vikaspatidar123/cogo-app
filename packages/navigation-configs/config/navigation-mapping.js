import app_apis from '../apis/get-app-apis';
import ProductClassification from '../icons/product-classification.svg';

const navigationMappings = {
	app_dashboard: {
		key         : 'app_dashboard',
		title       : 'Dashboard',
		href        : '/v2/dashboard',
		as          : '/v2/dashboard',
		type        : 'link',
		icon        : 'nav-tasks',
		line        : true,
		main_apis   : ['list_store_quota'],
		module_type : 'dashboards',
	},

	saas_tools: {
		key         : 'saas_tools',
		title       : 'Tools',
		icon        : 'nav-tools',
		isSubNavs   : true,
		showInNav   : true,
		isNew       : true,
		module_type : 'dashboards',
		options     : [
			{
				key           : 'saas_tools-hs_code_classification',
				title         : 'Product Classification',
				href          : '/v2/saas/hs-classification',
				as            : '/v2/saas/hs-classification',
				type          : 'link',
				icon          : <ProductClassification />,
				main_apis     : [],
				possible_apis : app_apis.saas_hs_code_list,
			},

		],
	},

	app_get_started: {
		key           : 'app_get_started',
		title         : 'Get Started',
		type          : 'modal',
		theme         : 'green',
		icon          : 'nav-checklist',
		main_apis     : [],
		possible_apis : app_apis.app_get_started,
		module_type   : 'dashboards',
	},

	app_settings: {
		key           : 'app_settings',
		title         : 'Settings',
		href          : '/settings',
		as            : '/settings',
		type          : 'link',
		icon          : 'nav-payments',
		line          : true,
		main_apis     : [],
		showInNav     : false,
		possible_apis : app_apis.app_settings,
		module_type   : 'dashboards',
	},

};
export default navigationMappings;
