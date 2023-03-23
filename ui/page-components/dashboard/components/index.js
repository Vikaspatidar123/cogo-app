import { useSelector } from 'react-redux';

import Blogs from '../hooks/Blogs';
import GetSchedules from '../hooks/GetSchedules';
import GetTracking from '../hooks/GetTracking';
import useGetPromotion from '../hooks/useGetPromotion';

import DiscoverRates from './DiscoverRates';
import Elgibility from './Elgibility';
import ExportFactoring from './ExportFactoring';
import KYCPage from './KYCPage';
import PayLaterWidgets from './PayLaterWidgets';
import Promotion from './Promotion';
import Schedule from './Schedule';
import Shipments from './Shipments';
import styles from './styles.module.css';
import Tracking from './Tracking';
import ActiveTracking from './Tracking/ActiveTracking';

const INDIA_COUNTRY_ID = '541d1232-58ce-4d64-83d6-556a42209eb7';

function SassDashboard() {
	const { promotionData, promotion_data } = useGetPromotion();
	const { loading, schedules, air_data } = GetSchedules();
	const { air_track } = GetTracking();
	const airTracking = air_track?.dashboard_products?.air_tracking || {};
	const oceanTracking = air_track?.dashboard_products?.container_tracking	|| {};
	const { airData, oceanData } = air_data?.dashboard_products || {};

	const { query, country_id } = useSelector(({ general, profile }) => ({
		query      : general?.query,
		country_id : profile?.organization?.country_id,
	}));
	return (
		<div className={styles.main_class}>
			<div className={styles.main_class2}>
				<div className={styles.part1}>
					<div className={styles.top}>
						<KYCPage />
					</div>
					<Shipments />
					<div className={styles.container}>
						{/* <div>
					<KYCPage />
				</div> */}
						<div className={styles.child1}>
							<DiscoverRates />
							{/* <Schedule /> */}
						</div>
					</div>
					<Schedule />
					{/* {
						(Object.keys(airData.data).length > 0
						|| Object.keys(oceanData.data).length > 0 ? (
							// <Track />
							<p>...</p>
							) : (
								<Schedule />
							))
					} */}
					{/* <Tracking /> */}
					{
						(Object.keys(airTracking?.data || {}).length > 0
						|| Object.keys(oceanTracking?.data || {}).length > 0 ? (

							<ActiveTracking
								airTracking={airTracking}
								oceanTracking={oceanTracking}
							/>
							) : (
								<Tracking />
							))
					}

				</div>
				<div className={styles.part2}>
					<div className={styles.child2}>
						{country_id === INDIA_COUNTRY_ID
						&& query?.account_type === 'importer-exporter' && <PayLaterWidgets />}
						<Elgibility />
						<ExportFactoring />

						<Promotion
							promotion_data={promotion_data}
						/>
					</div>
				</div>
			</div>

		</div>
	);
}
export default SassDashboard;
