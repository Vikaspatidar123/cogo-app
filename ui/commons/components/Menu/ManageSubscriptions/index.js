import { useRouter } from '../../../../../packages/next';

import styles from './styles.module.css';

function ManageSubscriptions() {
	const router = useRouter();

	const subscriptions = () => {
		router.push('/saas/subscriptions');
	};

	return (
		<div className={styles.A} role="presentation" onClick={() => subscriptions()}>
			Manage Subscriptions
		</div>
	);
}

export default ManageSubscriptions;
