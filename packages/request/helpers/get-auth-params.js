import getNavData from './get-nav-data';

const getAuthParam = (
	permissions_navigations,
	routeConfig,
	pathname,
	projectNavigationMappings = null,
) => {
	const navigation = routeConfig?.routes?.[pathname]?.navigation || '';
	const navigationData = getNavData(navigation, projectNavigationMappings);
	const userNavigationPermissions = permissions_navigations?.[navigation];

	let defaultScope = null;
	let defaultView = null;
	(navigationData?.main_apis || []).forEach((api) => {
		const apiData = userNavigationPermissions?.[api];
		(apiData || []).forEach((scope) => {
			if (scope?.is_default && scope.type !== 'none') {
				defaultScope = scope?.type;
				defaultView = scope?.through_criteria?.[0] || null;
			}
		});
	});
	let authorizationparameters = `${navigation}:${defaultScope}`;
	if (defaultView) {
		authorizationparameters = `${authorizationparameters}:${defaultView}`;
	}
	if (navigation && defaultScope) {
		return authorizationparameters;
	}
	return null;
};
export default getAuthParam;
