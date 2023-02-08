const {
	service_provider,
	importer_exporter,
} = require('../config/accountTypeConfig');

const account_types = [service_provider.prefix, importer_exporter.prefix];

// prettier-ignore

const documentWalet = {
	'/documents/[doc_type]': {
		account_types,
		navigation : 'app_documents',
		isMainNav  : true,
	},
	'/trade-documents/[document_type]/create': {
		account_types,
		navigation : 'app_documents',
		isMainNav  : true,
	},
	'/trade-documents/[document_type]/[id]': {
		account_types,
		navigation : 'app_documents',
		isMainNav  : true,
	},
	'/trade-documents/[document_type]/[id]/edit': {
		account_types,
		navigation : 'app_documents',
		isMainNav  : true,
	},
};

module.exports = documentWalet;
