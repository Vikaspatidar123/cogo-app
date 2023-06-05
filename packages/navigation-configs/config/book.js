// prettier-ignore

const book = {
	'/book': {
		navigation : 'app_discover_rates',
		isMainNav  : true,
	},
	'/book-deep-link': {
		navigation : 'app_discover_rates',
		isMainNav  : true,
	},
	'/book/new': {
		navigation : 'app_discover_rates',
		isMainNav  : true,
	},
	'/book/[search_id]': {
		navigation : 'app_discover_rates',
		isMainNav  : true,
	},
	'/checkout/[checkout_id]': {
		navigation : 'app_discover_rates',
		isMainNav  : true,
	},
	'/checkout/[checkout_id]/[shipment_id]': {
		navigation : 'app_discover_rates',
		isMainNav  : true,
	},
	'/book/[search_id]/checkout': {
		navigation : 'app_discover_rates',
		isMainNav  : true,
	},
	'/book/[search_id]/[shipment_id]/checkout': {
		navigation : 'app_discover_rates',
		isMainNav  : true,
	},
};

module.exports = book;
