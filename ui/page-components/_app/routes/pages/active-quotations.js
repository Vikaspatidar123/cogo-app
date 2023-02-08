const { importer_exporter } = require('../config/accountTypeConfig');

const account_types = [importer_exporter.prefix];

const activeQuotations = {
	'/active-quotations': {
		navigation: 'app_auto_quotation',
		isMainNav: true,
	},
};

module.exports = activeQuotations;
