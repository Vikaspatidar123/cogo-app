const { importer_exporter } = require('../config/accountTypeConfig');

const account_types = [importer_exporter.prefix];

const payLater = {
	'/pay-later': {
		account_types,
		navigation: 'app_dashboard',
	},
	'/pay-later/documentation': {
		account_types,
		navigation: 'app_dashboard',
	},
};

module.exports = payLater;
