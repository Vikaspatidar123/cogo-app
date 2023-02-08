const {
	service_provider,
	importer_exporter,
} = require('../config/accountTypeConfig');

const account_types = [service_provider.prefix, importer_exporter.prefix];

// prettier-ignore

const paymentTerms = {
	'/payment-dashboard': {
		account_types,
		navigation : 'saas_finance-payment_dashboard',
		isMainNav  : true,
	},
};

module.exports = paymentTerms;
