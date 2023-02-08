const { service_provider, importer_exporter } = require('../config/accountTypeConfig');

const account_types = [service_provider.prefix, importer_exporter.prefix];

// prettier-ignore

const settings = {
	'/settings': {
		account_types,
		navigation : 'app_settings',
		isMainNav  : true,
	},
	'/settings/select-service': {
		account_types : [service_provider.prefix],
		navigation    : 'app_settings',
		isMainNav     : true,
	},
};

module.exports = settings;
