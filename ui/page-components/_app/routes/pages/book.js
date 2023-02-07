const { importer_exporter } = require('../config/accountTypeConfig');

const account_types = [importer_exporter.prefix];

// prettier-ignore

const book = {
	'/book': {
		account_types,
		navigation : 'app_discover_rates',
		isMainNav  : true,
	},
	'/book-deep-link': {
		account_types,
		navigation : 'app_discover_rates',
		isMainNav  : true,
	},
	'/book/new': {
		account_types,
		navigation : 'app_discover_rates',
		isMainNav  : true,
	},
	'/book/[search_id]': {
		account_types,
		navigation : 'app_discover_rates',
		isMainNav  : true,
	},
	'/checkout/[checkout_id]': {
		account_types,
		navigation : 'app_discover_rates',
		isMainNav  : true,
	},
	'/checkout/[checkout_id]/[shipment_id]': {
		account_types,
		navigation : 'app_discover_rates',
		isMainNav  : true,
	},
	'/book/[search_id]/checkout': {
		account_types,
		navigation : 'app_discover_rates',
		isMainNav  : true,
	},
	'/book/[search_id]/[shipment_id]/checkout': {
		account_types,
		navigation : 'app_discover_rates',
		isMainNav  : true,
	},
};

module.exports = book;
