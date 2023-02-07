const { service_provider } = require('../config/accountTypeConfig');

const account_types = [service_provider.prefix];

// prettier-ignore

const rateManagement = {
	'/rate-management/[service]/add': {
		account_types,
		authorization : ['kyc'],
		navigation    : 'app_rms',
		isMainNav     : true,
	},
	'/rate-management/[service]/[module]': {
		account_types,
		navigation : 'app_rms',
		isMainNav  : true,
	},
	'/rate-management/[service]/[module]/add': {
		account_types,
		authorization : ['kyc'],
		navigation    : 'app_rms',
		isMainNav     : true,
	},
	'/rate-management/rate-sheets': {
		account_types,
		navigation : 'app_rms',
		isMainNav  : true,
	},
	'/rate-management/pudo-locations': {
		account_types,
		navigation : 'app_rms',
		isMainNav  : true,
	},
	'/rate-management/[service]': {
		account_types,
		authorization : ['kyc'],
		navigation    : 'app_rms',
		isMainNav     : true,
	},
	'/port-management/[type]': {
		account_types,
		navigation : 'app_pms',
		isMainNav  : true,
	},
	'/port-management/[type]/[portId]': {
		account_types,
		navigation : 'app_pms',
		isMainNav  : true,
	},
};

module.exports = rateManagement;
