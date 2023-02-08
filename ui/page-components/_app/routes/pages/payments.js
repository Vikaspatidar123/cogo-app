const {
	service_provider,
	importer_exporter,
} = require('../config/accountTypeConfig');

const account_types = [service_provider.prefix, importer_exporter.prefix];

// prettier-ignore

const payments = {
	'/payments': {
		account_types,
		navigation : 'app_payments',
		isMainNav  : true,
	}
};

module.exports = payments;
