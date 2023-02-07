const { service_provider, importer_exporter } = require('../config/accountTypeConfig');

const account_types = [service_provider.prefix, importer_exporter.prefix];

// prettier-ignore

const cogoStore = {
	'/store'                        : { account_types },
	'/store/[service_type]/pricing' : {
		account_types,
		navigation : 'app_pricing',
		isMainNav  : true,
	},
	'/store/container-tracking': {
		account_types,
		navigation : 'app_container_tracking',
		isMainNav  : true,
	},
	'/store/container-tracking/[id]': {
		account_types,
		navigation : 'app_container_tracking',
		isMainNav  : true,
	},
	'/store/sailing-schedule': {
		account_types,
		navigation : 'app_ocean_schedules',
		isMainNav  : true,
	},
	'/store/sailing-schedule/[id]': {
		account_types,
		navigation : 'app_ocean_schedules',
		isMainNav  : true,
	},
	'/store/freight-rate-trend': {
		account_types,
		navigation : 'app_freight_rate_trend',
		isMainNav  : true,
	},
	'/store/freight-rate-trend/[id]': {
		account_types,
		navigation : 'app_freight_rate_trend',
		isMainNav  : true,
	},
	'/store/pricing/[service_type]': {
		account_types,
		navigation : 'app_pricing',
		isMainNav  : true,
	},
};

module.exports = cogoStore;
