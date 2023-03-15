import { useRouter } from '@/packages/next';

const useRedirectUrl = () => {
	const { push } = useRouter();

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
	return {
		redirectManageSubscription,
		redirectCheckoutAddon,
		redirectBalanceHistory,
		redirectCheckoutSubscription,
	};
};

export default useRedirectUrl;
