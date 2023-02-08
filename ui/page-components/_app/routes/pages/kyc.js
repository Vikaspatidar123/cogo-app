const { service_provider, importer_exporter } = require('../config/accountTypeConfig');

const account_types = [service_provider.prefix, importer_exporter.prefix];

// prettier-ignore

const kyc = {
	'/kyc': {
		account_types,
		navigation : 'app_kyc',
		isMainNav  : true,
	},
};

module.exports = kyc;
