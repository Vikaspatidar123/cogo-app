import { Button } from '@cogoport/components';
import { IcACollaboration } from '@cogoport/icons-react';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';
import HeaderGreeting from './Greeting';
function Head() {
	const { push } = useRouter();
	const onUpgrade = () => {
		push('/saas/cogo-subscriptions/manage-subscription');
	};
	return (
		<div className={styles.container}>
			<div className={styles.message}>
				<HeaderGreeting />
			</div>
			<div className={styles.text_container}>
				<div className={styles.icon}>
					<IcACollaboration />
				</div>
				<div>
					You are our
					<span className={styles.premium}> Premium</span>
					subscribed user
				</div>
				<Button size="sm" themeType="accent" onClick={() => onUpgrade()}>Upgrade</Button>

			</div>
		</div>
	);
}
export default Head;
