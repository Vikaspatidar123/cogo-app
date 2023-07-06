const contractManagement = {
	'/contract-management': {
		navigation : 'app_contract_management',
		isMainNav  : true,
	},
	'/contract-management/[contract_id]': {
		navigation : 'app_contract_management',
		isMainNav  : false,
	},
};

module.exports = contractManagement;
