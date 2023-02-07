const { service_provider } = require('../config/accountTypeConfig');

const account_types = [service_provider.prefix];
const enquiries = {
	'/enquiries': {
		account_types,
		navigation: 'app_enquiries',
		isMainNav: true,
	},
	'/enquiries-revert/[id]': { account_types, navigation: 'app_enquiries' },
};

module.exports = enquiries;
