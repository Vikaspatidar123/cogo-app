import { useState } from 'react';

import Header from './components/Header';
import List from './components/List';
import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function ShipmentAlerts() {
	const { query } = useRouter();

	const [isEdit, setEdit] = useState(query?.isEdit || false);

	return (
		<div className={styles.container}>
			<Header isEdit={isEdit} setEdit={setEdit} />
			<List isEdit={isEdit} setEdit={setEdit} />
		</div>
	);
}
export default ShipmentAlerts;
