const withPrefix = require('./config/withPrefix');
const accept_terms_and_conditions = require('./pages/accept-terms-and-conditions');
const active_quotation = require('./pages/active-quotations');
// const api = require('./pages/api');
const authorization = require('./pages/authorization');
const book = require('./pages/book');
const contract_rates = require('./pages/contract-rates');
const dashboard = require('./pages/dashboard');
const regular = require('./pages/regular');
const saas = require('./pages/saas');
const settings = require('./pages/settings');
const shipments = require('./pages/shipments');

const prefixedRoutes = withPrefix({
	...authorization,
	...shipments,
	...book,
	...dashboard,
	...settings,
	...saas,
	...contract_rates,
	...active_quotation,
	...accept_terms_and_conditions,
});

const routes = {
	...regular,
	...prefixedRoutes,
};

export default { routes };
