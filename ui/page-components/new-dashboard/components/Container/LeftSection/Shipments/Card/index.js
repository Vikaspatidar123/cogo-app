import LeftContainer from './LeftContainer';
import ShipmentInfo from './ShipmentInfo';
import styles from './styles.module.css';

function card({ data }) {
	const items = data.map((item) => ({
		key    : item?.id,
		render : () => (
			<div className={styles.container}>
				<ShipmentInfo item={item} />
				<LeftContainer item={item} />
			</div>
		),
	}));
	return items;
}
export default card;
