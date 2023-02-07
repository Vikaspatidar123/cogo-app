const {
	service_provider,
	importer_exporter,
} = require('../config/accountTypeConfig');

const account_types = [service_provider.prefix, importer_exporter.prefix];

const app_fs = {
	'/pay-later': {
		account_types,
		navigation: 'app_financial_services',
		isMainNav: true,
	},
};

module.exports = app_fs;
