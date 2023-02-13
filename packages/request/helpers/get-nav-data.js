const getNavData = (navigation, projectNavigationMappings = null) => {
	const navigationMappings = projectNavigationMappings;
	const navs = navigation.split('-');
	const isSubNavs = navs.length > 1;
	const mainNav = navigationMappings?.[navs[0]];
	const navigationData = isSubNavs
		? mainNav.options.find((optObj) => optObj.key === navigation)
		: mainNav;
	return navigationData;
};
export default getNavData;
