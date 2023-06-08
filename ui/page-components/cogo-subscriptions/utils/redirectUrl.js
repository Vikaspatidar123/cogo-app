import { useRouter } from '@/packages/next';
import { useSelector } from '@/packages/store';

const useRedirectUrl = () => {
	const { profile } = useSelector((s) => s);
	const { push = () => {}, query = {} } = useRouter();
	const { addons = '', account_type = '' } = query || {};
	const { organization = {}, branch = {} } = profile || {};

	const redirectManageSubscription = () => {
		push('/saas/cogo-subscriptions/manage-subscription');
	};

	const redirectCheckoutAddon = (id, value) => {
		push(`/saas/cogo-subscriptions/checkout?addons=true&id=${id}&quantity=${value}`);
	};

	const redirectBalanceHistory = () => {
		push('/saas/cogo-subscriptions/balance-history');
	};

	const redirectCheckoutSubscription = (id, activeTab, plan_pricing_id) => {
		push(
			`/saas/cogo-subscriptions/checkout?active=${id}&period=${activeTab}&plan_pricing_id=${plan_pricing_id}`,
		);
	};
	const getCallBackUrl = (checkout_id) => {
		const callback_url = addons
			? `${process.env.NEXT_PUBLIC_APP_URL}v2/${organization?.id}/${branch?.id}/${account_type}/saas/cogo-subscriptions/balance-history?checkout_id=${checkout_id}`
			: `${process.env.NEXT_PUBLIC_APP_URL}v2/${organization?.id}/${branch?.id}/${account_type}/saas/cogo-subscriptions/manage-subscription?checkout_id=${checkout_id}`;
		return callback_url;
	};
	return {
		redirectManageSubscription,
		redirectCheckoutAddon,
		redirectBalanceHistory,
		redirectCheckoutSubscription,
		getCallBackUrl,
	};
};

export default useRedirectUrl;
