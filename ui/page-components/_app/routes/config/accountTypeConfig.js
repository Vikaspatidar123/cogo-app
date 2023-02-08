// prettier-ignore

const accountTypeConfig = {
	public_route: { prefix: 'public', default_route: '/login' },
	all: { prefix: 'all', default_route: '/dashboard' },
	importer_exporter: { prefix: 'importer_exporter', default_route: '/book' },
	service_provider: { prefix: 'service_provider', default_route: '/dashboard' },
	unauthenticated: { prefix: 'unauthenticated', default_route: '/login' },
	imp_exp_contract: { prefix: 'importer_exporter', default_route: '/contract-rates' },
};

module.exports = accountTypeConfig;
