const { importer_exporter } = require('../config/accountTypeConfig');

const account_types = [importer_exporter.prefix];

// prettier-ignore

const contract_rates = {
	'/contract-rates': {
		account_types,
		navigation : 'app_contract_rates',
		isMainNav  : true,
	},
	'/contract-rates/[contract_id]': {
		account_types,
		navigation : 'app_contract_rates',
	},
};

module.exports = contract_rates;
