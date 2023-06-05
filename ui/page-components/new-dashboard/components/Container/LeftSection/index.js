import CustomDuty from './CustomDuty';
import SearchRates from './SearchRates';
import styles from './styles.module.css';
import TrackShipment from './TrackShipment';

function LeftSection() {
	return (
		<div>
			<SearchRates />
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
