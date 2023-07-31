import Container from './Container';
import Footer from './Footer';
import Head from './Head';
import styles from './styles.module.css';

function ShipmentInfo({ item }) {
	return (
		<div className={styles.container}>
			<Head item={item} />
			<div className={styles.body_box}>
				<Container item={item} />
				<Footer item={item} />
			</div>

		</div>
	);
}
export default ShipmentInfo;
