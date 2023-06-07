import LeftContainer from './LeftContainer';
import ShipmentInfo from './ShipmentInfo';
import styles from './styles.module.css';

function Card({ item }) {
	return (
		<div className={styles.container}>
			<ShipmentInfo item={item} />
			<LeftContainer item={item} />
		</div>
	);
}
export default Card;
