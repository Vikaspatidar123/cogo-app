import { useRouter } from '@/packages/next';

const redirectUrl = () => {
	const { query = {} } = useRouter();
	const { org_id, branch_id, account_type } = query || {};
	const subscriptionsUrl = `${process.env.NEXT_PUBLIC_APP_URL}/v2/${org_id}/${branch_id}/${account_type}/saas/cogo-subscriptions`;
	const pendingUrl =	'https://cogoport-production.sgp1.digitaloceanspaces.com/fd861847978bcd188077a44b7c4ead56/98619-pending-status.gif';
	const successUrl =	'https://cogoport-production.sgp1.digitaloceanspaces.com/0761dcb4fd2c4a1f94bd51cdf0616632/82735-success.gif';
	return { subscriptionsUrl, pendingUrl, successUrl };
};
export default redirectUrl;
