import { cl } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import useListShipments from '../../../hooks/useListShipments';

import CustomDuty from './CustomDuty';
import Schedule from './Schedule';
import SearchRates from './SearchRates';
import ShipmentLoading from './ShipmentLoading';
import Shipments from './Shipments';
import styles from './styles.module.css';
import TrackAndTrace from './TrackAndTrace';
import TrackShipment from './TrackShipment';

function LeftSection() {
	const { t } = useTranslation(['dashboard']);
	const { loading, data } = useListShipments();
	const list = data?.list || [];
	return (
		<div>
			<SearchRates />
			<TrackAndTrace />
			<div className={styles.container}>
				<div className={styles.main_box}>
					{(!isEmpty(list.length) && !loading)
						? <Shipments list={list} />
						: <ShipmentLoading loading={loading} />}
				</div>
				<div className={cl`${styles.main_box} ${styles.schedule}`}>
					<div className={styles.heading}>
						{t('dashboard:schedule_title_text')}
					</div>
					<Schedule />
				</div>
			</div>
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
