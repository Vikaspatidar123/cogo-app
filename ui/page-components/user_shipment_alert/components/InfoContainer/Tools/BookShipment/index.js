import SearchRate from './SearchRate';
import styles from './styles.module.css';

function BookShipment() {
	return (
		<div className={styles.container}>

			<div className={styles.title}>
				Book Domestic
				Shipment within mins
			</div>
			<div>
				Compare multiple rates, Check schedules & Pay later for Shipments
			</div>
			<SearchRate />
		</div>
	);
}

export default BookShipment;
