import book from './config/book';
import dashboard from './config/dashboard';
import PUBLIC_PATHS from './config/public-paths';
import rolesAndPermissions from './config/roles-n-permission';
import saas from './config/saas';
import settings from './config/settings';
import shipments from './config/shipments';
import withPrefix from './config/withPrefix';

const routeConfig = withPrefix({
	...rolesAndPermissions,
	...saas,
	...settings,
	...dashboard,
	...shipments,
	...book,
});

const routes = {
	...PUBLIC_PATHS,
	...routeConfig,
};
export default { routes };
