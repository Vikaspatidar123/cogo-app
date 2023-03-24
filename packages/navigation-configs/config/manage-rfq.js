const manageRfq = {
	'/manage-rfq': {
		navigation : 'app_manage_rfq',
		isMainNav  : true,
	},
	'/manage-rfq/create': {
		navigation : 'app_manage_rfq',
		isMainNav  : true,
	},

	'/manage-rfq/[rfq_id]': {
		navigation : 'app_manage_rfq',
		isMainNav  : true,
	},
};

module.exports = manageRfq;
