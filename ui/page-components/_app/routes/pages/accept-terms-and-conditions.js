const { importer_exporter } = require('../config/accountTypeConfig');

const account_types = [importer_exporter.prefix];

const acceptTermsAndConditions = {
	'/accept-terms-and-conditions': {
		account_types,
		navigation: 'app_accept_terms_and_conditions',
		isMainNav: true,
	},
};

module.exports = acceptTermsAndConditions;
