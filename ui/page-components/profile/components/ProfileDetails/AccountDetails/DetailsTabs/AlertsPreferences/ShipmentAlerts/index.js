import { useState } from 'react';

import Header from './components/Header';
import List from './components/List';
import styles from './styles.module.css';

function ShipmentAlerts() {
	const [isEdit, setEdit] = useState(false);

	return (
		<div className={styles.container}>
			<Header isEdit={isEdit} setEdit={setEdit} />
			<List isEdit={isEdit} setEdit={setEdit} />
		</div>
	);
}
export default ShipmentAlerts;
