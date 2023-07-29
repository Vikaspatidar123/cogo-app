import Header from './components/Header';
import List from './components/List';
import styles from './styles.module.css';

function ShipmentAlerts() {
	return (
		<div className={styles.container}>
			<Header />
			<List />
		</div>
	);
}
export default ShipmentAlerts;
