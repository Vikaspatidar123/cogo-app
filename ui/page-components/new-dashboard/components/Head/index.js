import { Button } from '@cogoport/components';
import { IcACollaboration } from '@cogoport/icons-react';

import styles from './styles.module.css';

function Head() {
	return (
		<div className={styles.container}>
			<div className={styles.message}>Hello Good morning!</div>
			<div className={styles.text_container}>
				<div className={styles.icon}>
					<IcACollaboration />
				</div>
				<div>
					You are our
					<span className={styles.premium}> Premium</span>
					subscribed user
				</div>
				<Button size="sm" themeType="accent">Upgrade</Button>

			</div>
		</div>
	);
}
export default Head;
