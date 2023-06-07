import ListShipments from '../../../hooks/ListShipments';

import CustomDuty from './CustomDuty';
import SearchRates from './SearchRates';
import Shipments from './Shipments';
import styles from './styles.module.css';
import TrackShipment from './TrackShipment';

function LeftSection() {
	const { loading, data } = ListShipments();
	const list = data?.list || [];
	return (
		<div>
			<SearchRates />
			{list.length > 0 && <Shipments list={list} />}
			<div className={styles.section}>
				<div className={styles.box}>
					<TrackShipment />
				</div>
				<div className={styles.box}>
					<CustomDuty />
				</div>
			</div>
		</div>
	);
}
export default LeftSection;
