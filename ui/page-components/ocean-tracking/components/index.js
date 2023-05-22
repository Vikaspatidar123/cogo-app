import { useState } from 'react';

import Header from './Header';
import styles from './styles.module.css';
import Tab from './Tab';

function OceanTracking() {
	const [archived, setArchived] = useState(false);

	return (
		<div className={styles.container}>
			{!archived && <Header />}
			<div className={styles.tab}>
				<Tab archived={archived} setArchived={setArchived} />
			</div>
		</div>
	);
}

export default OceanTracking;
