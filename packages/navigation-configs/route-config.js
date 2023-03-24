import dashboard from './config/dashboard';
import route from './config/public-paths';
import rolesAndPermissions from './config/roles-n-permission';
import saas from './config/saas';
import settings from './config/settings';
import shipments from './config/shipments';
import withPrefix from './config/withPrefix';

const { PUBLIC_PATHS, UNAUTHENTICATED, All } = route || {};
const routeConfig = withPrefix({
	...rolesAndPermissions,
	...saas,
	...settings,
	...dashboard,
	...shipments,
});

const routes = {
	...PUBLIC_PATHS,
	...UNAUTHENTICATED,
	...All,
	...routeConfig,
};
export default { routes };
