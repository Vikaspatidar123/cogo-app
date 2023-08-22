const shipments = {
	'/shipments': {
		navigation : 'app_bookings',
		isMainNav  : true,
	},
	'/shipments/[id]': {
		navigation : 'app_bookings',
		isMainNav  : true,
	},
	'/shipments/[id]/[service_id]': {
		navigation : 'app_bookings',
		isMainNav  : true,
	},
	'/shipments/service/[service]': {
		navigation : 'app_bookings',
		isMainNav  : true,
	},
	'/shipments/shipment-type/[shipment]': {
		navigation : 'app_bookings',
		isMainNav  : true,
	},
	'/book/[search_id]/[shipment_id]': {
		navigation : 'app_discover_rates',
		isMainNav  : true,
	},
	'/shipment-report': {
		navigation : 'app_settings',
		isMainNav  : true,
	},
};

module.exports = shipments;
