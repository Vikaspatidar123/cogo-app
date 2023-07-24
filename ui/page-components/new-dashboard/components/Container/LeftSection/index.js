import { isEmpty } from '@cogoport/utils';

import useListShipments from '../../../hooks/useListShipments';

import CustomDuty from './CustomDuty';
import SearchRates from './SearchRates';
import ShipmentLoading from './ShipmentLoading';
import Shipments from './Shipments';
import styles from './styles.module.css';
import TrackAndTrace from './TrackAndTrace';
import TrackShipment from './TrackShipment';

function LeftSection() {
	const { loading, data } = useListShipments();
	const list = data?.list || [];
	return (
		<div>
			<SearchRates />
			<TrackAndTrace />
			{(!isEmpty(list.length) && !loading)
				? <Shipments list={list} />
				: <ShipmentLoading loading={loading} />}

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
