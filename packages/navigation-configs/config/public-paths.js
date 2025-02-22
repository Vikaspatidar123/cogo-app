const All = [
	'/login',
	'/forgot-password',
	'/reset-password/[id]',
	'/apply',
	'/api/getMetabaseUrl',
	'/api/get-content',
	'/url/[token]',
	'/verify-auto-sign-up-email/[token]',
	'/verify-auto-login/[token]',
	'/feedback/[feedback_id]/[css]',
	'/verify-microsoft-link',
	'/unsubscribe',
	'/verify-sign-up-saas/[token]',
	'/generate-outlook-token',
	'/get-started',
	'/signup',
	'/verify-email/[id]',
];
const PUBLIC_PATHS = [
	'/url/[token]',
	'/forgot-password',
	'/set-password/[id]',
	'/reset-password/[id]',
	'/verify-email/[id]',
	'/terms-and-conditions/[id]',
	'/verify-auto-sign-up-email/[token]',
	'/verify-auto-login/[token]',
	'/accept-invite/[id]',
	'/verify-sign-up-saas/[token]',
	'/raise-cancellation-ticket',
	'/create-ticket/[token]',
	'/draft-airway-bill/[id]',
	'/unsubscribe-container-update/[id]',
	'/add-dunning-relevant-user-new/[token]',
	'/url/[token]',
	'/user-shipment-alert',
	'/discovery-rates/[id]/[origin]/[destination]',
	'/traking/[trackingType]/[trackingId]',
];
const UNAUTHENTICATED = ['/login', '/signup'];
export default { PUBLIC_PATHS, UNAUTHENTICATED, All };
