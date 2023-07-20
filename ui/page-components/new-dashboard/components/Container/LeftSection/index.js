import { isEmpty } from '@cogoport/utils';

import ListShipments from '../../../hooks/ListShipments';

import CustomDuty from './CustomDuty';
import SearchRates from './SearchRates';
import ShipmentLoading from './ShipmentLoading';
import Shipments from './Shipments';
import styles from './styles.module.css';
import TrackAndTrace from './TrackAndTrace';
import TrackShipment from './TrackShipment';

function LeftSection() {
	const { loading, data } = ListShipments();
	const list = data?.list || [];
	return (
		<div>
			<SearchRates />

			{(!isEmpty(list.length) && !loading)
				? <Shipments list={list} />
				: <ShipmentLoading loading={loading} />}
			<TrackAndTrace />
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
