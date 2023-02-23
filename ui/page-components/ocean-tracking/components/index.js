import Header from './Header';
import styles from './styles.module.css';
import Tab from './Tab';

function OceanTracking() {
	return (
		<div className={styles.container}>
			<Header />
			<div className={styles.tab}>
				<Tab />
			</div>
		</div>
	);
}

export default OceanTracking;
