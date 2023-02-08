const {
	service_provider,
	importer_exporter,
} = require('../config/accountTypeConfig');

const account_types = [service_provider.prefix, importer_exporter.prefix];

// prettier-ignore

const shipments = {
	'/shipments': {
		account_types,
		navigation : 'app_bookings',
		isMainNav  : true,
	},
	'/shipments/[id]': {
		account_types,
		navigation : 'app_bookings',
		isMainNav  : true,
	},
	'/shipments/[id]/[service_id]': {
		account_types,
		navigation : 'app_bookings',
		isMainNav  : true,
	},
	'/shipments/service/[service]': {
		account_types,
		navigation : 'app_bookings',
		isMainNav  : true,
	},
	'/shipments/shipment-type/[shipment]': {
		account_types,
		navigation : 'app_bookings',
		isMainNav  : true,
	},
	'/book/[search_id]/[shipment_id]': {
		account_types,
		navigation : 'app_discover_rates',
		isMainNav  : true,
	},
};

module.exports = shipments;
