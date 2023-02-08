const accountTypeConfig = require('./config/accountTypeConfig');
const withPrefix = require('./config/withPrefix');
const accept_terms_and_conditions = require('./pages/accept-terms-and-conditions');
const active_quotation = require('./pages/active-quotations');
const api = require('./pages/api');
const authorization = require('./pages/authorization');
const book = require('./pages/book');
const cogoStore = require('./pages/cogo-store');
const contract_rates = require('./pages/contract-rates');
const dashboard = require('./pages/dashboard');
const documentWalet = require('./pages/document-walet');
const enquiries = require('./pages/enquiries');
const app_fs = require('./pages/financial-services');
const kyc = require('./pages/kyc');
const payLater = require('./pages/pay-later');
const paymentDashboard = require('./pages/payment-dashboard');
const payments = require('./pages/payments');
const rateManagement = require('./pages/rateManagement');
const regular = require('./pages/regular');
const saas = require('./pages/saas');
const settings = require('./pages/settings');
const shipments = require('./pages/shipments');

const prefixedRoutes = withPrefix({
	...authorization,
	...cogoStore,
	...payments,
	...rateManagement,
	...shipments,
	...book,
	...dashboard,
	...kyc,
	...settings,
	...documentWalet,
	...enquiries,
	...saas,
	...app_fs,
	...payLater,
	...paymentDashboard,
	...contract_rates,
	...active_quotation,
	...accept_terms_and_conditions,
});

const routes = {
	...regular,
	...api,
	...prefixedRoutes,
};

module.exports = { routes, accountTypeConfig };
