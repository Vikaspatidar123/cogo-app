const {
	service_provider,
	importer_exporter,
} = require('../config/accountTypeConfig');

const account_types = [service_provider.prefix, importer_exporter.prefix];

// prettier-ignore

const dashboard = {
	'/dashboard': {
		account_types,
		navigation : 'app_dashboard',
		isMainNav  : true,
	},
};

module.exports = dashboard;
