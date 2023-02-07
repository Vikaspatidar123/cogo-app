const { importer_exporter } = require('../config/accountTypeConfig');

const account_types = [importer_exporter.prefix];

const saasCogopointDashboard = {
	'/saas_cogopoint_dashboard': {
		account_types,
		navigation: 'saas_cogopoint_dashboard',
		isMainNav: true,
	},
};

module.exports = saasCogopointDashboard;
