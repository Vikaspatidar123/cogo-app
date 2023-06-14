import { useState } from 'react';

import List from './List';
import styles from './styles.module.css';
import Usage from './Usage';

function BalanceHistroy() {
	const [pendingModal, setPendingModal] = useState(false);

	return (
		<div className={styles.container}>
			<Usage pendingModal={pendingModal} setPendingModal={setPendingModal} />
			<List pendingModal={pendingModal} />
		</div>
	);
}

export default BalanceHistroy;
