
import navigationMappings from './navigation-mapping';

const getCondition = (urlItem) => {
	const condition = {};
	if (urlItem?.user_email) {
		condition.user_email = urlItem.user_email;
	}
	if (urlItem?.user_role_ids) {
		condition.user_role_ids = urlItem.user_role_ids;
	}
	if (urlItem?.user_id) {
		condition.user_id = urlItem.user_id;
	}
	return condition;
};

const AJEET_EMAIL_ID = 'ajeet@cogoport.com';

const getSideBarConfigs = ({
	userData,
	dashboardUrls = [],
	pinnedNavKeys = [],
	t = () => { }
}) => {

	const navigation = navigationMappings({ t });

	const pNavs = userData?.permissions_navigations || {};

	const modifiedPinnedNavKeys = pinnedNavKeys.filter((key) => Object.keys(navigation).includes(key));

	const filteredKeys = Object.keys(navigation).filter(
		(key) => !modifiedPinnedNavKeys.includes(key),
	);

	const getNavMappings = (navMappingKeys) => {
		const nav_items = [];

		(navMappingKeys || []).forEach((key) => {
			const { showInNav = true } = navigation?.[key] || {};
			if (
				key
				&& showInNav
				&& (pNavs?.[key] || navigation[key]?.options)
			) {
				if (key === 'dashboards') {
					nav_items.push({
						...navigation[key],
						options: dashboardUrls.map((urlItem) => ({
							title: urlItem.title,
							type: 'link',
							as: `/dashboards/${urlItem.urlKey}`,
							href: '/dashboards/[dashboard_type]',
							condition: getCondition(urlItem),
						})),
					});
				} else if (navigation[key]?.options) {
					const allOpts = navigation[key]?.options || [];
					// const selectedSubNavs = Object.keys(pNavs);
					const selectedSubNavs = Object.keys(pNavs).filter(
						(nav) => nav.split('-')[0] === key,
					);
					const filteredOpts = allOpts.filter(
						(opt) => selectedSubNavs.includes(opt.key)
							&& (opt.key !== 'coe-booking_tasks'
								|| userData.email === AJEET_EMAIL_ID),
					);
					if (filteredOpts.length) {
						nav_items.push({
							...navigation[key],
							options: filteredOpts,
						});
					}
				} else if (pNavs?.[key]) {
					nav_items.push(navigation[key]);
				}
			}
		});
		return nav_items;
	};
	return {
		nav_items: {
			organization: getNavMappings(filteredKeys),
		},
	};
};

export default getSideBarConfigs;
