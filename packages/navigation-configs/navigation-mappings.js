import {
	IcMOceanSchedules,
	IcMRateManagement, IcMRateSheets,
} from '@cogoport/icons-react';

import apis from './apis';

const navigationMappings = {

	saas_tracking: {
		key           : 'saas_tracking',
		title         : 'Container Tracking',
		href          : '/saas/tracking',
		as            : '/saas/tracking',
		type          : 'link',
		main_apis     : [],
		possible_apis : apis.app_saas_tracking,
		module_type   : 'crm',
	},
	saas_schedules: {
		key           : 'saas_schedules',
		title         : 'Ocean Schedules',
		href          : '/saas/schedules',
		as            : '/saas/schedules',
		type          : 'link',
		icon          : IcMOceanSchedules,
		possible_apis : apis.app_saas_schedules,
		main_apis     : [],
		module_type   : 'crm',
	},
	saas_cogo_subscription: {
		key           : 'saas_cogo_subscription',
		title         : 'Subscriptions',
		icon          : 'nav-subscriptions',
		isSubNavs     : true,
		isNew         : true,
		showInNav     : true,
		module_type   : 'dashboards',
		possible_apis : apis.app_saas_cogo_subscription,
		main_apis     : [],
		options       : [
			{
				key         : 'saas_cogo_subscription-manage',
				title       : 'Manage Subscription',
				type        : 'link',
				icon        : <IcMRateManagement />,
				href        : '/saas/cogo-subscription/manage-subscription',
				as          : '/saas/cogo-subscription/manage-subscription',
				description : 'Hello',

			},
			{
				key         : 'saas_cogo_subscription-balance_history',
				title       : 'Balance And History',
				type        : 'link',
				icon        : <IcMRateSheets />,
				href        : '/saas/cogo-subscription/balance-history',
				as          : '/saas/cogo-subscription/balance-history',
				description : 'Nice',

			},
		],
	},

};

export default navigationMappings;
