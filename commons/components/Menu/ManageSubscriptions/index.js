import { useRouter } from '@/temp/next';

import { A } from '../styles';

function ManageSubscriptions() {
	const router = useRouter();

	const subscriptions = () => {
		router.push('/saas/subscriptions');
	};

	return (
		<A as="button" onClick={() => subscriptions()}>
			Manage Subscriptions
		</A>
	);
}

export default ManageSubscriptions;
