import { useState } from 'react';

import Header from './Header';
import styles from './styles.module.css';
import Tab from './Tab';

function AirTracking() {
	const [archived, setArchived] = useState(false);

	return (
		<div className={styles.container}>
			{!archived && <Header />}
			<Tab archived={archived} setArchived={setArchived} />
		</div>
	);
}

export default AirTracking;
