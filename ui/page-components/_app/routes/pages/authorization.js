const { service_provider, importer_exporter } = require('../config/accountTypeConfig');

const account_types = [service_provider.prefix, importer_exporter.prefix];

// prettier-ignore

const authorization = { '/authorization/failed/[type]': { account_types } };

module.exports = authorization;
