import dashboard from './config/dashboard';
import manageRfq from './config/manage-rfq';
import PUBLIC_PATHS from './config/public-paths';
import rolesAndPermissions from './config/roles-n-permission';
import saas from './config/saas';
import settings from './config/settings';
import withPrefix from './config/withPrefix';

const routeConfig = withPrefix({
	...rolesAndPermissions,
	...saas,
	...settings,
	...dashboard,
	...manageRfq,
});

const routes = {
	...PUBLIC_PATHS,
	...routeConfig,
};
export default { routes };
