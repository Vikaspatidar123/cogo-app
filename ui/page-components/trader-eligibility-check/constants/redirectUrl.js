import { useRouter } from '@/packages/next';

const useRedirectUrl = () => {
	const { query = {} } = useRouter();
	const { org_id, branch_id, account_type } = query || {};
	const subscriptionsUrl = `${process.env.NEXT_PUBLIC_APP_URL}/${org_id}/${branch_id}/${account_type}/
	                           saas/cogo-subscriptions`;
	const pendingUrl = 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/clock.gif';
	const successUrl = 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/success.gif';
	return { subscriptionsUrl, pendingUrl, successUrl };
};
export default useRedirectUrl;
