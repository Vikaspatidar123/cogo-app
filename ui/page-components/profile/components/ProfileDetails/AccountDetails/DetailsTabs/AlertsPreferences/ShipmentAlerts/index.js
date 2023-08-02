import { useState } from 'react';

import Header from './components/Header';
import List from './components/List';
import styles from './styles.module.css';

function ShipmentAlerts() {
	const [isEdit, setEdit] = useState(false);

	const props = { isEdit, setEdit };

	return (
		<div className={styles.container}>
			<Header props={props} />
			<List props={props} />
		</div>
	);
}
export default ShipmentAlerts;
