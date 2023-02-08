const { public_route, all } = require('../config/accountTypeConfig');

// prettier-ignore

const api = {
	'/api/about/getAboutData'                      : { account_types: [public_route.prefix] },
	'/api/dashboardCards/getSellerDashboardCards'  : { account_types: [public_route.prefix] },
	'/api/dashboardCards/getShipperDashboardCards' : { account_types: [public_route.prefix] },
	'/api/nothing'                                 : { account_types: [public_route.prefix] },
	'/api/get-blogs'                               : { account_types: [all.prefix] },
};

module.exports = api;
