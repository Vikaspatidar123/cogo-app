const {
	public_route,
	all,
	unauthenticated,
} = require('../config/accountTypeConfig');

const regular = {
	'/': { account_types: [all.prefix] },
	'/app': { account_types: [all.prefix] },
	'/url/[token]': { account_types: [public_route.prefix] },
	'/app/[org_id]/[branch_id]/[account_type]': { account_types: [all.prefix] },
	'/app/[org_id]/[branch_id]/[account_type]/channel-partner': {
		account_types: [all.prefix],
	},
	'/app/set-password': { account_types: [all.prefix] },
	'/app/select-account': { account_types: [all.prefix] },
	'/login': { account_types: [unauthenticated.prefix] },
	'/signup': { account_types: [unauthenticated.prefix] },
	'/app/get-started': { account_types: [all.prefix] },
	'/forgot-password': { account_types: [public_route.prefix] },
	'/set-password/[id]': { account_types: [public_route.prefix] },
	'/reset-password/[id]': { account_types: [public_route.prefix] },
	'/verify-email/[id]': { account_types: [public_route.prefix] },
	'/terms-and-conditions/[id]': { account_types: [public_route.prefix] },
	'/verify-auto-sign-up-email/[token]': {
		account_types: [public_route.prefix],
	},
	'/verify-auto-login/[token]': { account_types: [public_route.prefix] },
	'/accept-invite/[id]': { account_types: [public_route.prefix] },
	'/frontend-utils/webflow-app': { account_types: [public_route.prefix] },
	'/store/trade-documents/[document_type]/[id]/print': {
		account_types: [public_route.prefix],
	},
	'/store/container-tracking/[id]': { account_types: [public_route.prefix] },
	'/unsubscribe-container-update/[id]': {
		account_types: [public_route.prefix],
	},
	'/api/services/mjml-to-html': {
		roles: [public_route.prefix],
		account_types: [public_route.prefix],
	},
	'/revert-negotiation/[token]': { account_types: [public_route.prefix] },
	'/feedback/[feedback_id]/[css]': { account_types: [public_route.prefix] },
	'/add-dunning-relevant-user/[token]': {
		account_types: [public_route.prefix],
	},
	'/send-dunning-email-feedback/[token]': {
		account_types: [public_route.prefix],
	},
	'/dunning-payment/[token]': {
		account_types: [public_route.prefix],
	},
	'/verify-sign-up-saas/[token]': { account_types: [public_route.prefix] },
};

module.exports = regular;
